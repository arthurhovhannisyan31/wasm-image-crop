import type { SxProps } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

export const controlsContainer: SxProps = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: "16px",
  marginTop: "40px",
  "& .Mui-disabled > svg > path": {
    fill: grey[500]
  },
  width: "500px"
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

export const flipVIconStyles: SxProps = {
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
