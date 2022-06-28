import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { logout } = useAuth();

  return (
    <div>
      <p>Home Page</p>
      <button
        onClick={logout}
        className="p-2 px-6 mt-8 font-bold text-gray-800 bg-green-300 rounded"
      >
        Logout
      </button>
    </div>
  );
}
Home.requireAuth = true;
