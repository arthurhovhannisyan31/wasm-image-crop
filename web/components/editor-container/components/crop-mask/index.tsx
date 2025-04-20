import { type FC, type PointerEvent, useEffect, useImperativeHandle, useRef } from "react";

import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { Box } from "@mui/material";

import { CROP_MASK_ID } from "./constants";
import { isBottomRightCorner } from "./helpers";
import { containerStyles, resizeImageStyles } from "./styles";

export interface CropMaskDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CropMaskRefProps {
  getCropData: () => CropMaskDimensions;
}

export interface CropMaskProps {
  ref: (val: CropMaskRefProps) => void; // TODO Ref with getCropData method
}

export const CropMask: FC<CropMaskProps> = ({
  ref
}) => {
  const cropRef = useRef<HTMLDivElement>(null);
  const containerRect = useRef<DOMRect>(null);
  const position = useRef({
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0
  });

  const handlePointerDown = (e: PointerEvent) => {
    // get the mouse cursor position at startup:
    position.current.x0 = e.clientX;
    position.current.y0 = e.clientY;

    cropRef.current?.setPointerCapture(e.pointerId);

    if (!cropRef.current) {
      return;
    }

    const elementRect = cropRef.current.getBoundingClientRect();

    if (isBottomRightCorner(elementRect.right, elementRect.bottom, e.clientX, e.clientY)) {
      return;
    }

    e.preventDefault();

    cropRef.current.onpointermove = slide;
  };

  const handlePointerUp = (e: PointerEvent) => {
    if (!cropRef.current || !containerRect.current) {
      return;
    }

    cropRef.current.releasePointerCapture(e.pointerId);
    cropRef.current.onpointermove = null;

    const elementRect = cropRef.current.getBoundingClientRect();

    /* Resize crop container to fit image container bounds */
    if (isBottomRightCorner(elementRect.right, elementRect.bottom, e.clientX, e.clientY)) {
      const bottomDiff = elementRect.bottom - containerRect.current.bottom;
      const rightDiff = elementRect.right - containerRect.current.right;

      if (rightDiff > 0) {
        cropRef.current.style.width = `${(elementRect.width - rightDiff).toString()}px`;
      }
      if (bottomDiff > 0) {
        cropRef.current.style.height = `${(elementRect.height - bottomDiff).toString()}px`;
      }
    }
  };

  const slide: GlobalEventHandlers["onpointermove"] = (e) => {
    if (!cropRef.current || !containerRect.current) {
      return;
    }
    const {
      left: containerLeft,
      top: containerTop,
      right: containerRight,
      bottom: containerBottom,
    } = containerRect.current;

    const elementRect = cropRef.current.getBoundingClientRect();

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
      cropRef.current.style.top = `${top.toString()}px`;
    }
    if (left >= 0 && right + containerLeft <= containerRight) {
      cropRef.current.style.left = `${left.toString()}px`;
    }
  };

  useEffect(() => {
    if (cropRef.current) {
      containerRect.current = cropRef.current?.getBoundingClientRect();
    }
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      getCropData: () => {
        const cropRect = cropRef.current?.getBoundingClientRect();

        return {
          x: cropRect?.x ?? 0,
          y: cropRect?.y ?? 0,
          width: cropRect?.width ?? 0,
          height: cropRect?.height ?? 0,
        };
      }
    })
  );

  return (
    <Box
      id={CROP_MASK_ID}
      ref={cropRef}
      sx={containerStyles}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* TODO Add divider 2 horizontal 2 vertical */}
      <UnfoldMoreIcon sx={resizeImageStyles} />
    </Box>
  );
};
