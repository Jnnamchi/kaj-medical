import Link from "next/link";
import Layout from "../components/layout";
import HomePage from "../containers/HomePage";
const styles = {
  content: {
    padding: "4px 32px 32px 32px",
    background: "#eeeeee",
    display: "inline-block",
  },
  linkAnchor: {
    color: "teal",
    display: "block",
    lineHeight: "160%",
  },
};
export default function Home() {
  return (
    <Layout>
      <HomePage />
      <Link href="/ssr-auth-required">
        <a style={styles.linkAnchor}>
          Example: SSR + data fetching with ID token
        </a>
      </Link>

      <Link href="/static-auth-required-loader">
        <a style={styles.linkAnchor}>
          Example: static + loader + data fetching with ID token
        </a>
      </Link>
    </Layout>
  );
}
Home.requireAuth = true;
