import { baseImageDimensions } from "components/editor-container/components/image-container/constants";

import type { ImageDimensions } from "components/editor-container/components/image-container/types";

/* returns base64 encoding string */
export const convertFileToDataURL = (
  file: File,
): Promise<string> => new Promise((res, rej) => {
  const reader = new FileReader();

  reader.onload = () => res(reader.result as string);
  reader.onerror = rej;
  reader.readAsDataURL(file);
});

export const createImage = async (
  src: string,
  width?: number,
  height?: number,
): Promise<HTMLImageElement> => {
  const img = document.createElement("img");

  if (width) {
    img.width = width;
  }

  if (height) {
    img.height = height;
  }

  img.src = src;

  return new Promise((res, rej) => {
    img.onload = () => {
      res(img);
    };
    img.onerror = (err) => {
      rej(err);
    };
  });
};

export const getImageFromFile = async (file: File): Promise<HTMLImageElement> => {
  const base64 = await convertFileToDataURL(file);

  return createImage(base64);
};

export const getNormalizedImageDimensions = (
  width: number,
  height: number,
): ImageDimensions => {
  const imgRatio = width / height;
  const baseRatio = baseImageDimensions.width / baseImageDimensions.height;

  if (imgRatio > baseRatio) {
    return {
      width: baseImageDimensions.width,
      height: Math.ceil(baseImageDimensions.width / imgRatio)
    };
  }

  return {
    width: Math.ceil(baseImageDimensions.height * imgRatio),
    height: baseImageDimensions.height
  };
};
