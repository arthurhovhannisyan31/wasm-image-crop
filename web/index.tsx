import { StrictMode, Suspense } from "react";

import ReactDOM from "react-dom/client";

import { EditorContainer } from "components/editor-container";
import { Layout } from "components/layout";

import "./main.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <Suspense fallback="Loading">
      <Layout>
        <EditorContainer />
      </Layout>
    </Suspense>
  </StrictMode>,
);
