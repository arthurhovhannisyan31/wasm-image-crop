export interface FiltersState {
  grayScale: boolean;
  flipVertically: boolean;
  flipHorizontally: boolean;
  rotate: number;
  blur: number;
  brighten: number;
  huerotate: number;
  contrast: number;
  unsharpen: number;
  invertColors: boolean;
  cropProps: CropProps;
}

export interface CropProps {
  crop_x: number;
  crop_y: number;
  crop_width: number;
  crop_height: number;
  crop_ratio: number;
}
