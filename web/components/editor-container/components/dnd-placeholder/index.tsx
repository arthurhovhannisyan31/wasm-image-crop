import { DragEvent, FC, useRef } from "react";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Input, Typography } from "@mui/material";

import { containerStyles, iconStyles } from "./styles";
import { inputStyles } from "../image-container/styles";

export interface DndPlaceholderProps {
  processFiles: (files: FileList | null | undefined) => Promise<void>;
}

export const DnDPlaceholder: FC<DndPlaceholderProps> = ({
  processFiles,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
      sx={containerStyles}
      onClick={openFileModal}
      onDrop={handleFileDrop}
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
      <CloudUploadIcon
        sx={iconStyles}
      />
      <Typography variant="h5">
        Drag and drop or click here
      </Typography>
      <Typography variant="caption" color="grey">
        to upload your image (max 10 MiB)
      </Typography>
    </Box>
  );
};
