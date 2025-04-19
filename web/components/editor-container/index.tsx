import { type FC, useCallback, useState } from "react";

import { Box, Button } from "@mui/material";

import { convertFileToDataURL } from "utility/helpers/image";
import { useDnDEvent } from "utility/hooks/useDnDEvent";
import { useInitWasm } from "utility/hooks/useInitWasm";

import { ImageContainer } from "./components/image-container";
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

  const disableControls = !imageData;

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
        showCrop={filtersState.showCrop}
        rotate={filtersState.rotate}
        blur={filtersState.blur}
        brighten={filtersState.brighten}
        huerotate={filtersState.huerotate}
        contrast={filtersState.contrast}
        unsharpen={filtersState.unsharpen}
        invertColors={filtersState.invertColors}
        disabled={disableControls}
      />
      <ImageContainer
        isDragOver={isDragOver}
        imageData={processedImageData ?? imageData ?? ""}
        processFiles={processFiles}
      />
      <Box display="flex" justifyContent="space-around">
        <Button
          onClick={handleResetState}
          variant="contained"
          color="info"
          disabled={disableControls}
        >
          Reset
        </Button>
        <Button
          onClick={handleClearState}
          variant="contained"
          color="warning"
          disabled={disableControls}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};
