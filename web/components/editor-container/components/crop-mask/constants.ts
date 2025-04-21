import type { CropProps } from "../image-filters/types";

export const CROP_MASK_ID = "crop-mask-id";
export const BOTTOM_RIGHT_CORNER_THRESHOLD = 18;

export const cropInitProps: CropProps = {
  crop_x: 0,
  crop_y: 0,
  crop_width: 0,
  crop_height: 0,
};
