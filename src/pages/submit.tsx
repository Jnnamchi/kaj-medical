import Layout from "../components/layout";
import SubmitPage from "../containers/SubmitPage";

export default function Survey() {
  return (
    <Layout>
      <SubmitPage />
    </Layout>
  );
}
Survey.requireAuth = true;
