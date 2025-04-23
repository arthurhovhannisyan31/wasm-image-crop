import { errorsDict, FILE_SIZE_LIMIT_MB, supportedMimeTypes } from "./constants";
import { convertFileToDataURL, createImage } from "../../utility/helpers/image";

export const imageFileValidation = (
  files: FileList,
): boolean => {
  if (!files.length) return false;

  if (files.length > 1) {
    alert(errorsDict.filesQuantity);

    return false;
  }
  const file = files[0];

  if (!file.type) {
    alert(errorsDict.fileType);

    return false;
  }

  if (!supportedMimeTypes.includes(file.type)) {
    alert(errorsDict.filesExtension);

    return false;
  }

  if (file.size > FILE_SIZE_LIMIT_MB) {
    alert(errorsDict.fileSize);

    return false;
  }

  return true;
};

export const processFiles = (
  setRawImageData: (val: string | undefined) => void,
  setProcessedImageData: (val: string | undefined) => void,
  setRawImageElement: (val: HTMLImageElement) => void
) => async (
  files: FileList | null | undefined,
): Promise<void> => {
  if (!files) {
    return;
  }
  if (!imageFileValidation(files)) {
    return;
  }

  try {
    const imageData = await convertFileToDataURL(files[0]);
    const imageElement = await createImage(imageData);

    setRawImageData(imageElement.src);
    setRawImageElement(imageElement);
    setProcessedImageData(undefined);
  } catch (e) {
    console.log(e);
    console.log(errorsDict.fileParsing);
  }
};
