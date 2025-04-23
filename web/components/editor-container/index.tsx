import { type FC, useMemo, useRef, useState } from "react";

import { Box } from "@mui/material";
import { isEqual } from "lodash-es";

import { useDnDEvent } from "utility/hooks/useDnDEvent";

import { CropMaskRef } from "./components/crop-mask/helpers";
import { useGetImageElement, useProcessImageData } from "./components/hooks";
import { ImageContainer } from "./components/image-container";
import { ImageControls } from "./components/image-controls";
import { ImageFilters } from "./components/image-filters";
import { imageFiltersInitState } from "./constants";
import { downloadImg, processFiles } from "./helpers";
import { containerStyles } from "./styles";

import type { FiltersState } from "./components/image-filters/types";

export const EditorContainer: FC = () => {
  const [rawFileObject, setRawFileObject] = useState<File | undefined>();
  const [rawImageElement, setRawImageElement] = useState<HTMLImageElement>();
  const [processedImageData, setProcessedImageData] = useState<string>();
  const [filtersState, setFiltersState] = useState<FiltersState>(imageFiltersInitState);
  const cropMaskRef = useRef<CropMaskRef>(null);

  const imageElement = useGetImageElement(rawImageElement?.src, processedImageData);
  const { isDragOver, ref } = useDnDEvent();
  const processImageData = useProcessImageData(setProcessedImageData);
  const curriedProcessFiles = useMemo(
    () => processFiles(
      setRawFileObject,
      setProcessedImageData,
      setRawImageElement
    ),
    []
  );

  const handleResetState = () => {
    cropMaskRef.current?.reset();
    setFiltersState(imageFiltersInitState);
    setProcessedImageData(undefined);
  };

  const handleClearState = () => {
    handleResetState();
    setRawImageElement(undefined);
  };

  const handleFiltersChange = (
    handleFiltersState: (val: FiltersState) => FiltersState
  ) => {
    const newFiltersState = handleFiltersState(filtersState);

    setFiltersState(newFiltersState);

    processImageData(
      rawImageElement as HTMLImageElement,
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
      cropProps: (cropMaskRef.current as CropMaskRef).getCropMaskData(
        rawImageElement?.width as number
      )
    }));
  };

  const disableControls = !rawImageElement;
  const isDownloadActive = isEqual(imageFiltersInitState, filtersState);

  const handleImageDownload = () => {
    if (processedImageData && rawFileObject) {
      downloadImg(
        processedImageData as string,
        rawFileObject as File
      );
    }
  };

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
        imageData={processedImageData ?? rawImageElement?.src}
        imageElement={imageElement}
        processFiles={curriedProcessFiles}
        cropRef={setCropRef}
      />
      <ImageControls
        disabled={disableControls}
        downloadActive={isDownloadActive}
        clearState={handleClearState}
        resetState={handleResetState}
        downloadImage={handleImageDownload}
      />
    </Box>
  );
};
