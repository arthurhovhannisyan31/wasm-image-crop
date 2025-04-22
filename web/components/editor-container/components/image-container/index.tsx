import { FC } from "react";

import { Box } from "@mui/material";

import { getNormalizedImageDimensions } from "utility/helpers/image";
import { preventDragEvent } from "utility/helpers/utils";

import { contentStyles, getContainerStyles, imageStyles } from "./styles";
import { CropMask } from "../crop-mask";
import { CropMaskRef } from "../crop-mask/helpers";
import { DnDPlaceholder } from "../dnd-placeholder";

import type { ImageData } from "../../types";

export interface ImageContainerProps {
  isDragOver: boolean;
  imageData?: ImageData;
  processedImage?: string;
  processFiles: (files: FileList | null | undefined) => Promise<void>;
  cropRef: (val: CropMaskRef) => void;
}

export const ImageContainer: FC<ImageContainerProps> = ({
  isDragOver,
  imageData,
  processedImage,
  processFiles,
  cropRef
}) => {
  const imgSrc = imageData?.src || processedImage;

  const {
    width,
    height
  } = getNormalizedImageDimensions(imageData?.width ?? 0, imageData?.height ?? 0);

  return (
    <Box
      sx={getContainerStyles(isDragOver)}
      onDragEnter={preventDragEvent}
      onDragOver={preventDragEvent}
      onDragStart={preventDragEvent}
    >
      {
        imageData
          ? (
              <Box sx={contentStyles}>
                <CropMask
                  ref={cropRef}
                />
                <img
                  src={imgSrc}
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
