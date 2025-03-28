/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");

require("dotenv").config();

const isProd = process.env.__PROD__;
const hash = isProd ? "contenthash:20" : "fullhash";

module.exports = {
  mode: "development",
  target: ["web", "es2020"],
  entry: [path.resolve("web", "index.tsx")],
  devtool: "inline-source-map",
  optimization: {
    minimize: true,
  },
  output: {
    path: path.resolve("dist"),
    filename: `[${hash}].[name].js`,
    publicPath: "",
    chunkFilename: `[${hash}].[name].chunk.js`,
  },
  experiments: {
    topLevelAwait: true,
    asyncWebAssembly: true,
  },
  devServer: {
    allowedHosts: "all",
    historyApiFallback: true,
    port: process.env.PORT || 4000,
    static: {
      directory: path.join(__dirname, "dist"),
      watch: {
        interval: 500,
        ignored: ["**/node_modules"],
        usePolling: true,
      },
    },
    server: {
      type: "http",
    },
  },
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        test: /\.(ts|js)x?$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: { outputPath: "public" },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `[${hash}].[name].css`,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve("public", "index.html"),
      cache: false,
      favicon: path.resolve("public", "favicon.ico"),
    }),
  ],
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".js", ".jsx", ".mjs", ".json"],
  },
  stats: "minimal",
};
