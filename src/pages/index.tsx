import HomePage from "../containers/HomePage";

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
Home.requireAuth = true;
