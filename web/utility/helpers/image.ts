/* returns base64 encoding string */
export const convertFileToDataURL = (
  file: File,
): Promise<string> => new Promise((res, rej) => {
  const reader = new FileReader();

  reader.onload = () => res(reader.result as string);
  reader.onerror = rej;
  reader.readAsDataURL(file);
});
