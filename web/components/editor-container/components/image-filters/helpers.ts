import { ImageFilter, imageFiltersInitState, RotateAngle } from "../../constants";

import type { FiltersState } from "./types";

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
        rotate: RotateAngle.Left
      };
    }
    case ImageFilter.RotateRight: {
      return {
        ...state,
        rotate: RotateAngle.Right
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
  }

  return imageFiltersInitState;
};
