import type { FiltersState } from "./components/image-filters/types";

export const supportedMimeTypes: string[] = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const supportedTypesLabel = supportedMimeTypes.map((el) => el.replace("image/", "")).join(", ");

export const errorsDict: Record<"fileType" | "filesQuantity" | "filesExtension" | "fileSize" | "fileParsing", string> = {
  fileType: "File type in not supported",
  filesQuantity: "Only one image can be uploaded",
  filesExtension: `Only the following formats are supported: ${supportedTypesLabel}`,
  fileSize: "Image size limit is 3 Mb",
  fileParsing: "Failed to process uploaded image, please try another one",
};

export const FILE_SIZE_LIMIT_MB: number = 3 * 1024 * 1024;
// 100kb

export const IMAGE_META_DATA_REGEX = /^data:image\/(png|jpeg|jpg|webp);base64,/;
export const ANGLE_STEP = 90;

export enum RotateAngle {
  Left = "left",
  Right = "right"
}

export enum ImageFilter {
  Grayscale = "grayscale",
  FlipVertically = "flip-vertically",
  FlipHorizontally = "flip-horizontally",
  RotateLeft = "rotate-left",
  RotateRight = "rotate-right",
  Crop = "crop",
  Blur = "blur",
  Brighten = "brighten",
  Huerotate = "huerotate",
  Contrast = "contrast",
  Unsharpen = "unsharpen",
  Invert = "invert"
}

export const imageFiltersInitState: FiltersState = {
  grayScale: false,
  flipVertically: false,
  flipHorizontally: false,
  showCrop: false,
  rotate: 0,
  blur: 0,
  brighten: 0,
  huerotate: 0,
  contrast: 0,
  unsharpen: 0,
  invertColors: false
};
