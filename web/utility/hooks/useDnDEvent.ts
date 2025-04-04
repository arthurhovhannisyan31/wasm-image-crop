import { type DragEvent, type RefObject, type UIEvent, useCallback, useEffect, useRef, useState } from "react";

import { stopImmediatePropagation } from "utility/helpers/utils";

const events = ["drop", "dragover", "dragenter"] as (keyof GlobalEventHandlersEventMap)[];

export interface DnDEventResult {
  ref: RefObject<HTMLDivElement | null>;
  isDragOver: boolean;
}

export const useDnDEvent = (
  cb?: (e: DragEvent<HTMLInputElement>) => void
): DnDEventResult => {
  const [isDragOver, setIsDragOver] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const updateOverState = useCallback((e: DragEvent<HTMLInputElement>) => {
    switch (e.type) {
      case "dragenter":
      case "dragover": {
        const isChildrenEvent = !!ref.current?.contains(e.target as Node);

        setIsDragOver(isChildrenEvent);

        return;
      }
      case "drop": {
        setIsDragOver(false);
      }
    }
  }, []);

  const eventHandler = useCallback((e: Event) => {
    stopImmediatePropagation(e as never as UIEvent);

    updateOverState(e as never as DragEvent<HTMLInputElement>);

    cb?.(e as never as DragEvent<HTMLInputElement>);
  }, [cb, updateOverState]);

  useEffect(() => {
    events.forEach((event) => document.addEventListener(
      event,
      eventHandler
    ));

    return () => {
      events.forEach((event) => document.removeEventListener(
        event,
        eventHandler
      ));
    };
  }, [eventHandler]);

  return {
    isDragOver,
    ref,
  };
};
