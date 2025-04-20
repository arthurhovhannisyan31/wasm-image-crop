import type { FC } from "react";

import { Box, Button } from "@mui/material";

export interface ImageControlsProps {
  disabled: boolean;
  resetState: () => void;
  clearState: () => void;
  downloadImage: () => void;
  downloadActive: boolean;
}

export const ImageControls: FC<ImageControlsProps> = ({
  resetState,
  clearState,
  disabled,
  downloadImage,
  downloadActive
}) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Button
        onClick={clearState}
        variant="contained"
        color="warning"
        disabled={disabled}
      >
        Clear
      </Button>
      <Button
        onClick={resetState}
        variant="contained"
        color="info"
        disabled={disabled}
      >
        Reset
      </Button>
      <Button
        onClick={downloadImage}
        variant="contained"
        color="success"
        disabled={disabled || downloadActive}
      >
        Download
      </Button>
    </Box>
  );
};
