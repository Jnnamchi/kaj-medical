import Layout from '../components/layout';
import SurveyPage from '../containers/SurveyPage';

export default function Survey() {
  return (
    <Layout>
      <SurveyPage />
    </Layout>
  );
}
Survey.requireAuth = true;
