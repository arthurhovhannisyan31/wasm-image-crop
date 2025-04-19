#!/bin/bash

# setup sw files
touch ./public/assets-manifest.json

__PROD__=true
yarn webpack --config configs/webpack/webpack.prod.js
yarn webpack --config configs/webpack/webpack.sw.js
