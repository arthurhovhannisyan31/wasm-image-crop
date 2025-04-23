import type { CSSProperties } from "react";

import type { SxProps } from "@mui/material";

import { MAX_HEIGHT, MAX_WIDTH } from "./constants";

export const inputStyles: SxProps = {
  display: "none",
};

export const getContainerStyles = (
  isDragOver: boolean,
  width: number = MAX_WIDTH,
  height: number = MAX_HEIGHT
): SxProps => ({
  display: "flex",
  width,
  height,
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

export const contentStyles: SxProps = {
  display: "flex",
  position: "relative"
};
