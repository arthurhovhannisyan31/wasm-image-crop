import { useCallback, useEffect, useState } from "react";

import { createImage } from "utility/helpers/image";
import { useInitWasm } from "utility/hooks/useInitWasm";

import { IMAGE_META_DATA_REGEX } from "../constants";
import { type CropProps, type FiltersState } from "./image-filters/types";

export const useProcessImageData = (
  setImageData: (val: string) => void
): ((
    rawImageElement: HTMLImageElement,
    filtersState: FiltersState
  ) => void) => {
  const wasm = useInitWasm();

  return useCallback((
    rawImageElement: HTMLImageElement,
    filtersState: FiltersState,
  ) => {
    try {
      const cropRatio = filtersState.cropProps.crop_ratio || 1;

      const cropProps: CropProps = {
        crop_x: Math.floor(filtersState.cropProps.crop_x * cropRatio),
        crop_y: Math.floor(filtersState.cropProps.crop_y * cropRatio),
        crop_width: Math.floor(
          /* fallback to original width if filter was not modified from 0 to other value */
          (filtersState.cropProps.crop_width || rawImageElement.width) * cropRatio
        ),
        crop_height: Math.floor(
          /* fallback to original width if filter was not modified from 0 to other value */
          (filtersState.cropProps.crop_height || rawImageElement.height) * cropRatio
        ),
        crop_ratio: 0
      };

      const headlessImageData = rawImageElement.src.replace(IMAGE_META_DATA_REGEX, "");

      performance.mark("start");
      const image_base64_data = wasm?.process_image(
        headlessImageData,
        filtersState.grayScale,
        filtersState.flipVertically,
        filtersState.flipHorizontally,
        filtersState.invertColors,
        filtersState.rotate,
        filtersState.blur,
        filtersState.brighten,
        filtersState.huerotate,
        filtersState.contrast,
        filtersState.unsharpen,
        cropProps.crop_x,
        cropProps.crop_y,
        cropProps.crop_width,
        cropProps.crop_height,
      );
      performance.mark("end");
      performance.measure("measure", "start", "end");
      console.log(
        "image processing duration: ",
        performance.getEntriesByName("measure").map(({ duration }) => duration),
      );

      if (image_base64_data) {
        setImageData(image_base64_data);
      }
    } catch (e) {
      console.log(e);
    }
  }, [setImageData, wasm]);
};

export const useGetImageElement = (
  rawImageData?: string,
  processedImageData?: string
): HTMLImageElement | undefined => {
  const [imageElement, setImageElement] = useState<HTMLImageElement | undefined>();

  useEffect(() => {
    if (processedImageData || rawImageData) {
      const getImageData = async (): Promise<void> => {
        setImageElement(await createImage((processedImageData ?? rawImageData) as string));
      };

      getImageData();
    } else {
      setImageElement(undefined);
    }
  }, [processedImageData, rawImageData]);

  return imageElement;
};
