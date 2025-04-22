import type { RefObject } from "react";

import { BOTTOM_RIGHT_CORNER_THRESHOLD, cropInitProps } from "./constants";

import type { CropProps } from "../image-filters/types";

export const isBottomRightCorner = (
  x0: number,
  y0: number,
  x1: number,
  y1: number
): boolean => (x0 - x1) < BOTTOM_RIGHT_CORNER_THRESHOLD || (y0 - y1) < BOTTOM_RIGHT_CORNER_THRESHOLD;

export interface CropMaskRef {
  getCropData: () => CropProps;
  reset: () => void;
}

export const getCropMaskRef = (
  cropRef: RefObject<HTMLDivElement | null>,
  containerRect: RefObject<DOMRect | null>
): CropMaskRef => {
  return {
    getCropData: () => {
      const cropRect = cropRef.current?.getBoundingClientRect();

      if (!cropRect || !containerRect.current) {
        return cropInitProps;
      }

      return {
        crop_x: cropRect.left - containerRect.current.left,
        crop_y: cropRect.top - containerRect.current.top,
        crop_width: cropRect.width,
        crop_height: cropRect.height,
      };
    },
    reset: () => {
      if (!cropRef.current || !containerRect.current) {
        return;
      }

      cropRef.current.style.top = "0px";
      cropRef.current.style.left = "0px";
      cropRef.current.style.width = `${(containerRect.current.width).toString()}px`;
      cropRef.current.style.height = `${(containerRect.current.height).toString()}px`;
    }
  };
};
