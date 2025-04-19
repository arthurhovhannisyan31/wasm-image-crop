import { FC } from "react";

import ContrastIcon from "@mui/icons-material/Contrast";
import CropIcon from "@mui/icons-material/Crop";
import FlipIcon from "@mui/icons-material/Flip";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
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
  setFiltersState: (val: (val: FiltersState) => FiltersState) => void;
  disabled: boolean;
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
  disabled,
  invertColors
}) => {
  const handleChange = (
    imageEffect: string,
    val?: unknown
  ) => {
    setFiltersState((state: FiltersState) => imageFiltersReducer(
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
            disabled={disabled}
          >
            <ContrastIcon sx={iconButtonStyles} />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Flip vertically">
          <ToggleButton
            value={ImageFilter.FlipVertically}
            selected={flipVertically}
            onChange={() => handleChange(ImageFilter.FlipVertically)}
            disabled={disabled}
          >
            <FlipIcon sx={iconButtonStyles} />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Flip horizontally">
          <ToggleButton
            value={ImageFilter.FlipHorizontally}
            selected={flipHorizontally}
            onChange={() => handleChange(ImageFilter.FlipHorizontally)}
            disabled={disabled}
          >
            <FlipIcon sx={flipHorizontallyIconStyles} />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Crop">
          <ToggleButton
            value={ImageFilter.Crop}
            selected={showCrop}
            onClick={_ => handleChange(ImageFilter.Crop)}
            disabled={disabled}
          >
            <CropIcon sx={flipHorizontallyIconStyles} />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Invert Colors">
          <ToggleButton
            value={ImageFilter.Invert}
            selected={invertColors}
            onClick={_ => handleChange(ImageFilter.Invert)}
            disabled={disabled}
          >
            <InvertColorsIcon sx={iconButtonStyles} />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Rotate left">
          <IconButton
            onClick={_ => handleChange(ImageFilter.RotateLeft)}
            disabled={disabled}
          >
            <RotateLeftIcon sx={iconButtonStyles} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Rotate right">
          <IconButton
            onClick={_ => handleChange(ImageFilter.RotateRight)}
            disabled={disabled}
          >
            <RotateRightIcon sx={iconButtonStyles} />
          </IconButton>
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
            disabled={disabled}
            min={0}
            max={50}
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
            disabled={disabled}
            min={-200}
            max={200}
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
            disabled={disabled}
            min={0}
            max={360}
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
            disabled={disabled}
            min={-100}
            max={100}
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
            disabled={disabled}
            min={0}
            max={100}
          />
        </Box>
        Crop
        Resize
      </Box>
    </Box>
  );
};
