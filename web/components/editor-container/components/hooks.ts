import { useCallback, useEffect, useState } from "react";

import { createImage } from "utility/helpers/image";
import { useInitWasm } from "utility/hooks/useInitWasm";

import { IMAGE_META_DATA_REGEX } from "../constants";
import { type CropProps, type FiltersState } from "./image-filters/types";

export const useProcessImageData = (
  setImageData: (val: string) => void
): ((
    imageData: string,
    filtersState: FiltersState
  ) => void) => {
  const wasm = useInitWasm();

  return useCallback((
    imageData: string,
    filtersState: FiltersState,
  ) => {
    try {
      console.log(filtersState.cropProps);
      const cropRatio = filtersState.cropProps.crop_ratio;
      // const newCropProps: CropProps = {
      //   //
      // };

      const headlessImageData = imageData.replace(IMAGE_META_DATA_REGEX, "");
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
        // Use ratio to adjust x, y, with and height
        filtersState.cropProps.crop_x,
        filtersState.cropProps.crop_y,
        filtersState.cropProps.crop_width,
        filtersState.cropProps.crop_height,
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
