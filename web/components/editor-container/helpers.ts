import { FILE_SIZE_LIMIT_MB, supportedMimeTypes } from "./constants";

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

  if (file.size > FILE_SIZE_LIMIT_MB) {
    // setSnackbarProps(
    //   errorsDict.fileSize,
    //   "error",
    // );

    return false;
  }

  return true;
};
