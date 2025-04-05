import type { SxProps } from "@mui/material";
import { blue } from "@mui/material/colors";

export const controlsContainer: SxProps = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: "16px",
  height: "inherit"
};

export const smallControlsContainerStyles: SxProps = {
  display: "flex",
  justifyContent: "space-between",
};

export const iconButtonStyles: SxProps = {
  width: "28px",
  height: "28px",
  color: blue[500]
};

export const flipHorizontallyIconStyles: SxProps = {
  ...iconButtonStyles,
  rotate: "90deg",
};

export const sliderControlsContainerStyles: SxProps = {
  display: "grid",
  paddingLeft: "20px",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "auto",
  columnGap: "24px",
};
