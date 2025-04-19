import type { SxProps } from "@mui/material";
import { blue } from "@mui/material/colors";

export const containerStyles: SxProps = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer"
};

export const iconStyles: SxProps = {
  width: "48px",
  height: "48px",
  color: blue[500]
};
