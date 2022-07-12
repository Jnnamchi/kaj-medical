import Layout from "../components/layout";
import SurveyPage from "../containers/SurveyPage";

export default function Survey() {
  return (
    <Layout>
      <SurveyPage />
      {/* <Test /> */}
    </Layout>
  );
}
Survey.requireAuth = true;
