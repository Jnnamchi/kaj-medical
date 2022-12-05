import Layout from "../components/layout";
import HomePage from "../containers/HomePage";

export default function Home() {
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
}
Home.requireAuth = true;
