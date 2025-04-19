import { type FC, type PointerEvent, useEffect, useRef } from "react";

import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { Box } from "@mui/material";

import { CROP_MASK_ID } from "./constants";
import { isBottomRightCorner } from "./helpers";
import { containerStyles } from "./styles";

export const CropMask: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRect = useRef<DOMRect>(null);
  const position = useRef({
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0
  });

  const handlePointerDown = (e: PointerEvent) => {
    if (ref.current) {
      const rect = ref.current?.getBoundingClientRect();
      if (isBottomRightCorner(rect.right, rect.bottom, e.clientX, e.clientY)) {
        // do not prevent default to allow resize
        // TODO prevent change size overflow
        return;
      }

      e.preventDefault();

      // get the mouse cursor position at startup:
      position.current.x0 = e.clientX;
      position.current.y0 = e.clientY;

      ref.current.onpointermove = slide;
    }
    ref.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: PointerEvent) => {
    if (ref.current) {
      ref.current.onpointermove = null;
    }
    ref.current?.releasePointerCapture(e.pointerId);
  };

  const slide: GlobalEventHandlers["onpointermove"] = (e) => {
    if (ref.current && containerRect.current) {
      const {
        left: containerLeft,
        top: containerTop,
        right: containerRight,
        bottom: containerBottom,
      } = containerRect.current;

      const elementRect = ref.current.getBoundingClientRect();

      // calculate the new cursor position:
      position.current.x1 = e.clientX - position.current.x0;
      position.current.y1 = e.clientY - position.current.y0;
      position.current.x0 = e.clientX;
      position.current.y0 = e.clientY;

      const left = elementRect.left + position.current.x1 - containerLeft;
      const right = left + elementRect.width;
      const top = elementRect.top + position.current.y1 - containerTop;
      const bottom = top + elementRect.height;

      // prevent mask overflow container
      if (top >= 0 && bottom + containerTop <= containerBottom) {
        ref.current.style.top = `${top.toString()}px`;
      }
      if (left >= 0 && right + containerLeft <= containerRight) {
        ref.current.style.left = `${left.toString()}px`;
      }
    }
  };

  useEffect(() => {
    if (ref.current) {
      containerRect.current = ref.current?.getBoundingClientRect();
    }
  }, []);

  return (
    <Box
      id={CROP_MASK_ID}
      ref={ref}
      sx={containerStyles}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* TODO Add divider 2 horizontal 2 vertical */}
      <AspectRatioIcon sx={{
        position: "absolute",
        bottom: -3,
        right: -2
      }}
      />
    </Box>
  );
};
