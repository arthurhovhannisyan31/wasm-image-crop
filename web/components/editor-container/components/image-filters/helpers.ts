import { ANGLE_STEP, ImageFilter, imageFiltersInitState, RotateAngle } from "../../constants";

import type { FiltersState } from "./types";

const rotateAngleCalculator = (
  direction: RotateAngle,
  angle: number
): number => {
  const angleSign = direction === RotateAngle.Right ? 1 : -1;
  const newAngle = angle + ANGLE_STEP * angleSign;

  if (newAngle < 0) {
    return ANGLE_STEP * 3;
  } else if (newAngle === 360) {
    return 0;
  }

  return newAngle;
};

export const imageFiltersReducer = (
  state: FiltersState,
  imageEffect: ImageFilter,
  value: any
): FiltersState => {
  switch (imageEffect) {
    case ImageFilter.Grayscale: {
      return {
        ...state,
        grayScale: !state.grayScale
      };
    }
    case ImageFilter.FlipVertically: {
      return {
        ...state,
        flipVertically: !state.flipVertically
      };
    }
    case ImageFilter.FlipHorizontally: {
      return {
        ...state,
        flipHorizontally: !state.flipHorizontally
      };
    }
    case ImageFilter.RotateLeft: {
      return {
        ...state,
        rotate: rotateAngleCalculator(RotateAngle.Left, state.rotate),
      };
    }
    case ImageFilter.RotateRight: {
      return {
        ...state,
        rotate: rotateAngleCalculator(RotateAngle.Right, state.rotate),
      };
    }
    case ImageFilter.Crop: {
      return {
        ...state,
        showCrop: !state.showCrop
      };
    }
    case ImageFilter.Blur:
    case ImageFilter.Brighten:
    case ImageFilter.Huerotate:
    case ImageFilter.Contrast:
    case ImageFilter.Unsharpen: {
      return {
        ...state,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        [imageEffect]: value
      };
    }
    case ImageFilter.Invert: {
      return {
        ...state,
        invertColors: !state.invertColors
      };
    }
  }

  return imageFiltersInitState;
};
