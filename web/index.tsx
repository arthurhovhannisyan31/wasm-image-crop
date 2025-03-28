import { StrictMode, Suspense } from "react";

import ReactDOM from "react-dom/client";

import { ImagesContainer } from "components/images-container";

import "./main.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <Suspense fallback="Loading">
      <ImagesContainer />
    </Suspense>
  </StrictMode>,
);
