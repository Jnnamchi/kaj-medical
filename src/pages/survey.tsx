import Layout from "../components/layout";
import SurveyPage from "../containers/SurveyPage";
import Test from "../containers/SurveyPage/test";

export default function Survey() {
  return (
    <Layout>
      <SurveyPage />
      {/* <Test /> */}
    </Layout>
  );
}
Survey.requireAuth = true;
