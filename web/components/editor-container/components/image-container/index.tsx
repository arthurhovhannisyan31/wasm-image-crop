import { FC } from "react";

import { Box } from "@mui/material";

import { preventDragEvent } from "utility/helpers/utils";

import { getContentStyles, imageStyles } from "./styles";
import { DnDPlaceholder } from "../dnd-placeholder";

export interface ImageContainerProps {
  isDragOver: boolean;
  imageData?: string;
  processFiles: (files: FileList | null | undefined) => Promise<void>;
}

export const ImageContainer: FC<ImageContainerProps> = ({
  isDragOver,
  imageData = "",
  processFiles
}) => {
  return (
    <Box
      sx={getContentStyles(isDragOver)}
      onDragEnter={preventDragEvent}
      onDragOver={preventDragEvent}
      onDragStart={preventDragEvent}
    >
      {
        imageData
          ? (
              <img
                src={imageData}
                alt="Processed image"
                style={imageStyles}
                width={500}
                height={500}
              />
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
