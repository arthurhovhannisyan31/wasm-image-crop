import { Dispatch, FC, SetStateAction } from "react";

import ContrastIcon from "@mui/icons-material/Contrast";
import CropIcon from "@mui/icons-material/Crop";
import FlipIcon from "@mui/icons-material/Flip";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { Box, IconButton, Slider, ToggleButton, Tooltip, Typography } from "@mui/material";

import { ImageFilter } from "components/editor-container/constants";

import { imageFiltersReducer } from "./helpers";
import {
  controlsContainer,
  flipHorizontallyIconStyles,
  iconButtonStyles,
  sliderControlsContainerStyles,
  smallControlsContainerStyles
} from "./styles";
import { FiltersState } from "./types";

export interface ImageFiltersProps
  extends FiltersState {
  setFiltersState: Dispatch<SetStateAction<FiltersState>>;
}

export const ImageFilters: FC<ImageFiltersProps> = ({
  setFiltersState,
  grayScale,
  showCrop,
  flipHorizontally,
  flipVertically,
  blur,
  brighten,
  huerotate,
  contrast,
  unsharpen,
}) => {
  const handleChange = (
    imageEffect: string,
    val?: unknown
  ) => {
    setFiltersState(state => imageFiltersReducer(
      state,
      imageEffect as ImageFilter,
      val
    ));
  };
  /* eslint-disable @typescript-eslint/no-unused-vars */
  return (
    <Box sx={controlsContainer}>
      <Box sx={smallControlsContainerStyles}>
        <Tooltip title="Grayscale">
          <ToggleButton
            value={ImageFilter.Grayscale}
            selected={grayScale}
            onChange={() => handleChange(ImageFilter.Grayscale)}
          >
            <ContrastIcon sx={iconButtonStyles} />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Flip vertically">
          <ToggleButton
            value={ImageFilter.FlipVertically}
            selected={flipVertically}
            onChange={() => handleChange(ImageFilter.FlipVertically)}
          >
            <FlipIcon sx={iconButtonStyles} />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Flip horizontally">
          <ToggleButton
            value={ImageFilter.FlipHorizontally}
            selected={flipHorizontally}
            onChange={() => handleChange(ImageFilter.FlipHorizontally)}
          >
            <FlipIcon sx={flipHorizontallyIconStyles} />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Rotate left">
          <IconButton
            onClick={_ => handleChange(ImageFilter.RotateLeft)}
          >
            <RotateLeftIcon sx={iconButtonStyles} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Rotate right">
          <IconButton
            onClick={_ => handleChange(ImageFilter.RotateRight)}
          >
            <RotateRightIcon sx={iconButtonStyles} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Crop">
          <ToggleButton
            value={ImageFilter.Crop}
            selected={showCrop}
            onClick={_ => handleChange(ImageFilter.Crop)}
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
          <Slider
            value={blur}
            valueLabelDisplay="auto"
            onChange={(_, val: number | number[]) => handleChange(ImageFilter.Blur, val)}
          />
        </Box>
        <Box>
          <Typography>
            Brighten
          </Typography>
          <Slider
            value={brighten}
            valueLabelDisplay="auto"
            onChange={(_, val: number | number[]) => handleChange(ImageFilter.Brighten, val)}
          />
        </Box>
        <Box>
          <Typography>
            Huerotate
          </Typography>
          <Slider
            value={huerotate}
            valueLabelDisplay="auto"
            onChange={(_, val: number | number[]) => handleChange(ImageFilter.Huerotate, val)}
          />
        </Box>
        <Box>
          <Typography>
            Contrast
          </Typography>
          <Slider
            value={contrast}
            valueLabelDisplay="auto"
            onChange={(_, val: number | number[]) => handleChange(ImageFilter.Contrast, val)}
          />
        </Box>
        <Box>
          <Typography>
            Unsharpen
          </Typography>
          <Slider
            value={unsharpen}
            valueLabelDisplay="auto"
            onChange={(_, val: number | number[]) => handleChange(ImageFilter.Unsharpen, val)}
          />
        </Box>
        Crop
        Resize
      </Box>
    </Box>
  );
};
