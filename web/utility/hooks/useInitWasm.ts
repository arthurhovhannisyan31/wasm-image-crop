import { useEffect, useState } from "react";

type WasmModule = typeof import("wasm-pkg");

export const useInitWasm = (): WasmModule | undefined => {
  const [wasmModule, setWasmModule] = useState<WasmModule>();

  useEffect(() => {
    async function loadWasm() {
      try {
        const wasm = await import("wasm-pkg") as unknown as WasmModule;
        if (wasm) {
          setWasmModule(wasm);
        }
      } catch (e) {
        console.log(e);
      }
    }

    loadWasm();
  }, []);

  return wasmModule;
};
