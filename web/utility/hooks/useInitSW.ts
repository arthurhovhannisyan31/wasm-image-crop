import { useEffect, useRef } from "react";

import { initSw, isSWRegistrationValid, type SWManager } from "@arthurhovhannisyan31/simple-service-worker";

export const useInitSW = (): void => {
  const swManagerRef = useRef<SWManager | null>(null);

  useEffect(() => {
    if (!isSWRegistrationValid() || swManagerRef.current) return;

    const init = async (): Promise<void> => {
      const swManager: SWManager | undefined = await initSw();

      if (swManager) {
        swManagerRef.current = swManager;
      }
    };
    init();
  }, []);
};
