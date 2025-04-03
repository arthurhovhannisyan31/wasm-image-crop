import type { FC } from "react";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Typography } from "@mui/material";

import { containerStyles, iconStyles } from "./styles";

export const NoDataPlaceholder: FC = () => {
  return (
    <Box sx={containerStyles}>
      <CloudUploadIcon
        sx={iconStyles}
      />
      <Typography variant="h5">
        Drag and drop or click here
      </Typography>
      <Typography variant="caption" color="grey">
        to upload your image (max 2 MiB)
      </Typography>
    </Box>
  );
};
