import type { UIEvent } from "react";

export const stopImmediatePropagation = (
  e: UIEvent,
): void => {
  e.preventDefault();
  e.stopPropagation();
};
