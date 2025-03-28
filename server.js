/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");

const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.use("/", express.static(path.join(__dirname, "dist")));

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(PORT, () => {
  console.log(`The app is running on port http://localhost:${PORT}`);
});
