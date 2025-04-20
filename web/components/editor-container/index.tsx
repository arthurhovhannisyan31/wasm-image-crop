import { type FC, useCallback, useRef, useState } from "react";

import { Box } from "@mui/material";
import { isEqual } from "lodash-es";

import { convertFileToDataURL } from "utility/helpers/image";
import { useDnDEvent } from "utility/hooks/useDnDEvent";
import { useInitWasm } from "utility/hooks/useInitWasm";

import { CropMaskRefProps } from "./components/crop-mask";
import { ImageContainer } from "./components/image-container";
import { ImageControls } from "./components/image-controls";
import { ImageFilters } from "./components/image-filters";
import { errorsDict, IMAGE_META_DATA_REGEX, imageFiltersInitState } from "./constants";
import { imageFileValidation } from "./helpers";
import { containerStyles } from "./styles";

import type { FiltersState } from "./components/image-filters/types";

export const EditorContainer: FC = () => {
  const wasm = useInitWasm();
  const [imageData, setImageData] = useState<string>();
  const [processedImageData, setProcessedImageData] = useState<string>();
  const [filtersState, setFiltersState] = useState<FiltersState>(imageFiltersInitState);
  const imageCropRef = useRef<CropMaskRefProps>(null);

  const { isDragOver, ref } = useDnDEvent();

  const processFiles = async (files: FileList | null | undefined) => {
    if (!files) {
      return;
    }
    if (!imageFileValidation(files)) {
      return;
    }

    try {
      const imageData = await convertFileToDataURL(files[0]);

      setImageData(imageData);
      setProcessedImageData(undefined);
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
        filtersState.unsharpen
      );

      if (image_base64_data) {
        setProcessedImageData(image_base64_data);
      }
    } catch (e) {
      console.log(e);
    }
  }, [wasm]);

  const handleResetState = () => {
    setFiltersState(imageFiltersInitState);
    setProcessedImageData(undefined);
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
      imageData as string,
      newFiltersState
    );
  };

  const setCropRef = (ref: CropMaskRefProps) => {
    if (ref) {
      imageCropRef.current = ref;
    }
  };

  const handleImageCrop = () => {
    console.log(imageCropRef.current?.getCropData());
    // set to state
    // call processImageData
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
      />
      <ImageContainer
        isDragOver={isDragOver}
        imageData={processedImageData ?? imageData ?? ""}
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
