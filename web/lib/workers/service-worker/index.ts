import { MainSW } from "@arthurhovhannisyan31/simple-service-worker";

declare const self: ServiceWorkerGlobalScope;

new MainSW(self);

export default {} as ServiceWorker;
