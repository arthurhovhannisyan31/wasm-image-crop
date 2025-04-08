import { DragEvent, FC, useRef } from "react";

import { Box, Input } from "@mui/material";

import { getContentStyles, imageStyles, inputStyles } from "./styles";
import { NoDataPlaceholder } from "../no-data-placeholder";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const preventDragEvent = (
    e: DragEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
  };

  const handleFileChange = () => {
    processFiles(inputRef.current?.files);
  };

  const openFileModal = () => {
    inputRef.current?.click();
  };

  const handleFileDrop = async (
    e: DragEvent<HTMLInputElement>
  ) => {
    processFiles(e.dataTransfer.files);
  };

  return (
    <Box
      sx={getContentStyles(isDragOver)}
      onClick={openFileModal}
      onDrop={handleFileDrop}
      onDragEnter={preventDragEvent}
      onDragOver={preventDragEvent}
    >
      <Input
        inputRef={inputRef}
        type="file"
        inputProps={{
          accept: "image/*",
          multiple: false,
          onChange: handleFileChange
        }}
        sx={inputStyles}
      />
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
          : <NoDataPlaceholder />
      }
    </Box>
  );
};
