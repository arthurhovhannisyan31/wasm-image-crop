import { MainSW } from "@arthurhovhannisyan31/simple-service-worker";

import { assetsPath, staticAssetsPath, debugMode, cacheName } from "lib/constants";

declare const self: ServiceWorkerGlobalScope;

new MainSW(self, {
  assetsPath,
  cacheName,
  debugMode,
  staticAssetsPath,
});

export default {} as ServiceWorker;
