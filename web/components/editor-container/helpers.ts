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
  setRawFileObject: (file: File) => void,
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

    setRawFileObject(files[0]);
    setRawImageElement(imageElement);
    setProcessedImageData(undefined);
  } catch (e) {
    console.log(e);
    console.log(errorsDict.fileParsing);
  }
};

export const downloadImg = async (
  imageBase64: string,
  originalFile: File
): Promise<void> => {
  const response = await fetch(imageBase64);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  const [oldName, extension]: string[] = originalFile.name.split(".");
  const name = `${oldName}-crop.${extension}`;

  a.href = url;
  a.download = name;
  a.click();
};
