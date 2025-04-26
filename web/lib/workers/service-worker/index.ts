import { MainSW, type AssetsManifest } from "@arthurhovhannisyan31/simple-service-worker";

import { assetsPath, staticAssetsPath, debugMode, cacheName } from "lib/constants";

import assetsManifest from "../../../../public/assets-manifest.json";

declare const self: ServiceWorkerGlobalScope;

new MainSW(
  self,
  assetsManifest as AssetsManifest, {
    assetsPath,
    cacheName,
    debugMode,
    staticAssetsPath,
  });

export default {} as ServiceWorker;
