import { useEffect, useRef } from "react";

import { initSw, isSWRegistrationValid, type SWManager } from "@arthurhovhannisyan31/simple-service-worker";

import { swEnabled } from "lib/constants";

export const useInitSW = (): void => {
  const swManagerRef = useRef<SWManager>(undefined);

  useEffect(() => {
    if (!isSWRegistrationValid() || swManagerRef.current) return;

    const init = async (): Promise<void> => {
      const swManager = await initSw(swEnabled);

      if (swManager) {
        swManagerRef.current = swManager;
      }
    };
    init();
  }, []);
};
