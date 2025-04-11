import type { SxProps } from "@mui/material";

export const containerStyles: SxProps = {
  resize: "both",
  overflow: "hidden",
  background: "rgba(255, 255, 255, 0.2)",
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 10,
  cursor: "move",
  border: "1px solid red",
};
