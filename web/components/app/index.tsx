import { EditorContainer } from "components/editor-container";
import { Layout } from "components/layout";
import { useInitSW } from "utility/hooks/useInitSW";

export const App = () => {
  useInitSW();

  return (
    <Layout>
      <EditorContainer />
    </Layout>
  );
};
