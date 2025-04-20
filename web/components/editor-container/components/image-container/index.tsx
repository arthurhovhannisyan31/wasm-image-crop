import { FC } from "react";

import { Box } from "@mui/material";

import { preventDragEvent } from "utility/helpers/utils";

import { contentStyles, getContainerStyles, imageStyles } from "./styles";
import { CropMask, CropMaskRefProps } from "../crop-mask";
import { DnDPlaceholder } from "../dnd-placeholder";

export interface ImageContainerProps {
  isDragOver: boolean;
  imageData?: string;
  processFiles: (files: FileList | null | undefined) => Promise<void>;
  cropRef: (val: CropMaskRefProps) => void;
}

export const ImageContainer: FC<ImageContainerProps> = ({
  isDragOver,
  imageData = "",
  processFiles,
  cropRef
}) => {
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
                  src={imageData}
                  alt="Processed image"
                  style={imageStyles}
                  width={500}
                  height={500}
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
