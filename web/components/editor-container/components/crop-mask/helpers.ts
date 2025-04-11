import { BOTTOM_RIGHT_CORNER_THRESHOLD } from "./constants";

export const isBottomRightCorner = (
  x0: number,
  y0: number,
  x1: number,
  y1: number
): boolean => {
  return (x0 - x1) < BOTTOM_RIGHT_CORNER_THRESHOLD || (y0 - y1) < BOTTOM_RIGHT_CORNER_THRESHOLD;
};
