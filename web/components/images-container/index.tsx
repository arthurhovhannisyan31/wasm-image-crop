import { type DragEvent, type FC, useRef, useState } from "react";

import { Box, Input } from "@mui/material";

import { convertFileToDataURL } from "utility/helpers/image";
import { useDnDEvent } from "utility/hooks/useDnDEvent";
import { useInitWasm } from "utility/hooks/useInitWasm";

import { NoDataPlaceholder } from "./components/no-data-placeholder";
import { errorsDict, IMAGE_META_DATA_REGEX } from "./constants";
import { imageFileValidation } from "./helpers";
import { getContainerStyles, inputStyles } from "./styles";

export const ImagesContainer: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const wasm = useInitWasm();
  const [imageData, setImageData] = useState("");
  const [processedImageData, setProcessedImageData] = useState("");

  const { isDragOver, ref } = useDnDEvent();

  const processFiles = async (files: FileList | null | undefined) => {
    if (!files) {
      return;
    }
    if (!imageFileValidation(files)) {
      return;
    }

    try {
      const imageData = await convertFileToDataURL(files[0]);
      setImageData(imageData);

      const headlessImageData = imageData.replace(IMAGE_META_DATA_REGEX, "");
      const image_base64_data = wasm?.grayscale(headlessImageData);

      if (image_base64_data) {
        setProcessedImageData(image_base64_data);
      }
    } catch (e) {
      console.log(e);
      console.log(errorsDict.fileParsing);
    }
  };

  const handleFileChange = () => {
    processFiles(inputRef.current?.files);
  };

  const openFileModal = () => {
    inputRef.current?.click();
  };

  const handleFileDrop = async (
    e: DragEvent<HTMLInputElement>
  ) => {
    if (!imageData) {
      processFiles(e.dataTransfer.files);
    }
  };

  const preventDragEvent = (
    e: DragEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
    // e.stopPropagation();
  };

  console.log({
    isDragOver
  });

  return (
    <Box ref={ref}>
      <Box
        sx={getContainerStyles(isDragOver)}
        onClick={openFileModal}
        onDrop={handleFileDrop}
        onDragEnter={preventDragEvent}
        onDragOver={preventDragEvent}
      >
        <Input
          inputRef={inputRef}
          type="file"
          inputProps={{
            accept: "image/*",
            multiple: false,
            onChange: handleFileChange
          }}
          sx={inputStyles}
        />
        {
          (imageData ?? processedImageData)
            ? (
                <img
                  src={processedImageData ?? imageData}
                  alt="Processed image"
                  width={500}
                  height={500}
                />
              )
            : <NoDataPlaceholder />
        }
      </Box>
    </Box>
  );
};
