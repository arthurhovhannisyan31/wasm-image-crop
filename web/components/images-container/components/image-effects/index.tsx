import { FC, useState } from "react";

import ContrastIcon from "@mui/icons-material/Contrast";
import CropIcon from "@mui/icons-material/Crop";
import FlipIcon from "@mui/icons-material/Flip";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { Box, IconButton, Slider, ToggleButton, Tooltip, Typography } from "@mui/material";

import {
  controlsContainer,
  flipHorizontallyIconStyles,
  iconButtonStyles,
  sliderControlsContainerStyles,
  smallControlsContainerStyles
} from "./styles";

export interface ImageEffectsProps {
  some?: boolean;
}

export const ImageEffects: FC<ImageEffectsProps> = () => {
  // TODO Move state to parent as object, pass as primitives

  const [grayScale, setGrayScale] = useState(false);
  const [flipVertically, setFlipVertically] = useState(false);
  const [flipHorizontally, setFlipHorizontally] = useState(false);
  const [crop, setCrop] = useState(false);

  return (
    <Box sx={controlsContainer}>
      <Box sx={smallControlsContainerStyles}>
        <Tooltip title="Grayscale">
          <ToggleButton
            value="check"
            selected={grayScale}
            onChange={() => setGrayScale(prev => !prev)}
          >
            <ContrastIcon sx={iconButtonStyles} />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Flip vertically">
          <ToggleButton
            value="check"
            selected={flipVertically}
            onChange={() => setFlipVertically(prev => !prev)}
          >
            <FlipIcon sx={iconButtonStyles} />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Flix horizontally">
          <ToggleButton
            value="check"
            selected={flipHorizontally}
            onChange={() => setFlipHorizontally(prev => !prev)}
          >
            <FlipIcon sx={flipHorizontallyIconStyles} />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Rotate left">
          <IconButton>
            <RotateLeftIcon sx={iconButtonStyles} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Rotate right">
          <IconButton>
            <RotateRightIcon sx={iconButtonStyles} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Crop">
          <ToggleButton
            value="check"
            selected={crop}
            onChange={() => setCrop(prev => !prev)}
          >
            <CropIcon sx={flipHorizontallyIconStyles} />
          </ToggleButton>
        </Tooltip>
      </Box>
      <Box sx={sliderControlsContainerStyles}>
        <Box>
          <Typography>
            Blur
          </Typography>
          <Slider />
        </Box>
        <Box>
          <Typography>
            Brighten
          </Typography>
          <Slider />
        </Box>
        <Box>
          <Typography>
            Huerotate
          </Typography>
          <Slider />
        </Box>
        <Box>
          <Typography>
            Contrast
          </Typography>
          <Slider />
        </Box>
        <Box>
          <Typography>
            Unsharpen
          </Typography>
          <Slider />
        </Box>
        Crop
        Resize
      </Box>
    </Box>
  );
};
