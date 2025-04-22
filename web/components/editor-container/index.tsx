import { type FC, useCallback, useRef, useState } from "react";

import { Box } from "@mui/material";
import { isEqual } from "lodash-es";

import { getImageFromFile } from "utility/helpers/image";
import { useDnDEvent } from "utility/hooks/useDnDEvent";
import { useInitWasm } from "utility/hooks/useInitWasm";

import { CropMaskRef } from "./components/crop-mask/helpers";
import { ImageContainer } from "./components/image-container";
import { ImageControls } from "./components/image-controls";
import { ImageFilters } from "./components/image-filters";
import { errorsDict, IMAGE_META_DATA_REGEX, imageFiltersInitState } from "./constants";
import { imageFileValidation } from "./helpers";
import { containerStyles } from "./styles";

import type { FiltersState } from "./components/image-filters/types";
import type { ImageData } from "./types";

export const EditorContainer: FC = () => {
  const wasm = useInitWasm();
  const [imageData, setImageData] = useState<ImageData | undefined>();
  const [processedImage, setProcessedImage] = useState<string>();
  const [filtersState, setFiltersState] = useState<FiltersState>(imageFiltersInitState);
  const cropMaskRef = useRef<CropMaskRef>(null);

  const { isDragOver, ref } = useDnDEvent();

  const processFiles = async (files: FileList | null | undefined) => {
    if (!files) {
      return;
    }
    if (!imageFileValidation(files)) {
      return;
    }

    try {
      const imageData = await getImageFromFile(files[0]);

      setImageData(imageData);
      setProcessedImage(undefined);
    } catch (e) {
      console.log(e);
      console.log(errorsDict.fileParsing);
    }
  };

  const processImageData = useCallback((
    imageData: string,
    filtersState: FiltersState
  ) => {
    try {
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
        setProcessedImage(image_base64_data);
      }
    } catch (e) {
      console.log(e);
    }
  }, [wasm]);

  const handleResetState = () => {
    cropMaskRef.current?.reset();
    setFiltersState(imageFiltersInitState);
    setProcessedImage(undefined);
  };

  const handleClearState = () => {
    handleResetState();
    setImageData(undefined);
  };

  const handleFiltersChange = (
    handleFiltersState: (val: FiltersState) => FiltersState
  ) => {
    const newFiltersState = handleFiltersState(filtersState);

    setFiltersState(newFiltersState);
    processImageData(
      imageData?.src as string,
      newFiltersState
    );
  };

  const setCropRef = (ref: CropMaskRef) => {
    if (ref) {
      cropMaskRef.current = ref;
    }
  };

  const handleImageCrop = () => {
    if (!cropMaskRef.current) {
      return;
    }
    handleFiltersChange(state => ({
      ...state,
      cropProps: (cropMaskRef.current as CropMaskRef).getCropData()
    }));
  };

  const disableControls = !imageData;
  const isDownloadActive = isEqual(imageFiltersInitState, filtersState);

  return (
    <Box
      ref={ref}
      sx={containerStyles}
    >
      <ImageFilters
        setFiltersState={handleFiltersChange}
        grayScale={filtersState.grayScale}
        flipHorizontally={filtersState.flipHorizontally}
        flipVertically={filtersState.flipVertically}
        rotate={filtersState.rotate}
        blur={filtersState.blur}
        brighten={filtersState.brighten}
        huerotate={filtersState.huerotate}
        contrast={filtersState.contrast}
        unsharpen={filtersState.unsharpen}
        invertColors={filtersState.invertColors}
        disabled={disableControls}
        crop={handleImageCrop}
        cropProps={filtersState.cropProps}
      />
      <ImageContainer
        isDragOver={isDragOver}
        imageData={imageData}
        processedImage={processedImage}
        processFiles={processFiles}
        cropRef={setCropRef}
      />
      <ImageControls
        disabled={disableControls}
        downloadActive={isDownloadActive}
        clearState={handleClearState}
        resetState={handleResetState}
        downloadImage={() => {
          // TODO Implement
        }}
      />
    </Box>
  );
};
