import { FC } from "react";

import { Box } from "@mui/material";

import { getNormalizedImageDimensions } from "utility/helpers/image";
import { preventDragEvent } from "utility/helpers/utils";

import { contentStyles, getContainerStyles, imageStyles } from "./styles";
import { CropMask } from "../crop-mask";
import { CropMaskRef } from "../crop-mask/helpers";
import { DnDPlaceholder } from "../dnd-placeholder";

export interface ImageContainerProps {
  isDragOver: boolean;
  imageData?: string;
  processFiles: (files: FileList | null | undefined) => Promise<void>;
  cropRef: (val: CropMaskRef) => void;
  imageElement: HTMLImageElement | undefined;
}

export const ImageContainer: FC<ImageContainerProps> = ({
  isDragOver,
  imageData,
  processFiles,
  cropRef,
  imageElement
}) => {
  const {
    width,
    height
  } = getNormalizedImageDimensions(imageElement?.width ?? 0, imageElement?.height ?? 0);

  return (
    <Box
      sx={getContainerStyles(isDragOver, width, height)}
      onDragEnter={preventDragEvent}
      onDragOver={preventDragEvent}
      onDragStart={preventDragEvent}
    >
      {
        imageData
          ? (
              <Box sx={contentStyles}>
                <CropMask
                  key={`${imageElement?.width}${imageElement?.height}`}
                  ref={cropRef}
                />
                <img
                  src={imageData}
                  alt="Processed image"
                  style={imageStyles}
                  width={width}
                  height={height}
                />
              </Box>
            )
          : (
              <DnDPlaceholder
                processFiles={processFiles}
              />
            )
      }
    </Box>
  );
};
