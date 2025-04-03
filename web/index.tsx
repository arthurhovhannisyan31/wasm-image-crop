import { StrictMode, Suspense } from "react";

import ReactDOM from "react-dom/client";

import { ImagesContainer } from "components/images-container";
import { Layout } from "components/layout";

import "./main.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <Suspense fallback="Loading">
      <Layout>
        <ImagesContainer />
      </Layout>
    </Suspense>
  </StrictMode>,
);
