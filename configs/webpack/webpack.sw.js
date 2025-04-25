/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("path");

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");

require("dotenv").config();

/** @type { import('webpack').Configuration } */
module.exports = {
  mode: "production",
  target: ["web", "es2020"],
  entry: {
    "service-worker": {
      import: path.resolve("web", "lib", "workers", "service-worker", "index.ts"),
      filename: "service-worker.js",
    },
  },
  output: {
    path: path.resolve("dist"),
    publicPath: "",
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({
      configFile: "./tsconfig.json",
    })],
    extensions: [".ts", ".js"],
  },
  stats: "minimal",
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        test: /\.(ts|js)?$/,
        loader: "ts-loader",
        options: {
          compilerOptions: {
            noEmit: false,
            outDir: "dist",
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
};
