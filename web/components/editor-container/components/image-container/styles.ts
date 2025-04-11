import type { CSSProperties } from "react";

import type { SxProps } from "@mui/material";

export const inputStyles: SxProps = {
  display: "none",
};

export const getContentStyles = (
  isDragOver: boolean
): SxProps => ({
  display: "flex",
  width: "500px",
  height: "500px",
  backgroundClip: "padding-box",
  backdropFilter: "blur(24px)",
  border: "1px solid grey",
  borderStyle: "dashed",
  borderWidth: isDragOver ? "5px" : "1px",
  strokeDasharray: [10, 20],
  borderRadius: "8px",
});

export const imageStyles: CSSProperties = {
  objectFit: "contain"
};
