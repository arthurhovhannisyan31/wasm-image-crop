import { errorsDict, FILE_SIZE_LIMIT_MB, supportedMimeTypes } from "./constants";
import { convertFileToDataURL } from "../../utility/helpers/image";

export const imageFileValidation = (
  files: FileList,
  // setSnackbarProps: (message: string, severity: AlertProps["severity"]) => void,
): boolean => {
  if (!files.length) return false;

  if (files.length > 1) {
    // setSnackbarProps(
    //   errorsDict.filesQuantity,
    //   "warning",
    // );
    return false;
  }
  const file = files[0];

  if (!file.type) {
    // setSnackbarProps(
    //   errorsDict.fileType,
    //   "error",
    // );

    return false;
  }

  if (!supportedMimeTypes.includes(file.type)) {
    // setSnackbarProps(
    //   errorsDict.filesExtension,
    //   "error",
    // );

    return false;
  }

  return file.size <= FILE_SIZE_LIMIT_MB;
};

export const processFiles = (
  setRawImageData: (val: string | undefined) => void,
  setProcessedImageData: (val: string | undefined) => void
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

    setRawImageData(imageData);
    setProcessedImageData(undefined);
  } catch (e) {
    console.log(e);
    console.log(errorsDict.fileParsing);
  }
};
