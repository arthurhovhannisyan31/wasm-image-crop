rm -rf ./wasm-pkg
wasm-pack build \
          --quiet \
          --out-dir wasm-pkg \
          --release

yarn build:fe

