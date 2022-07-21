import Layout from "../components/layout";
import OnBoardPage from "../containers/OnboardPage";

export default function OnBoard() {
  return (
    <div>
      <Layout>
        <OnBoardPage />
      </Layout>
    </div>
  );
}
OnBoard.requireAuth = true;
