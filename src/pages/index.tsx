import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { database } from "../config/firebase";
import { useEffect, useState } from "react";

export default function Home() {
  const { logout, user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const databaseRef = collection(database, "User Data");

  const getUserData = async (email: string) => {
    let data = await getDocs(databaseRef);

    const savedUserData = data.docs.map((data: any) => ({
      ...data.data(),
      id: data.id,
    }));

    const userData = savedUserData.find((user: any) => user.email === email);
    return userData;
  };

  useEffect(() => {
    if (user) {
      const identifyUserRole = async (email: string) => {
        const userData = await getUserData(email);
        if (userData.isAdmin) {
          setIsAdmin(true);
        }
      };
      identifyUserRole(user.email);
    }
  }, [user]);

  return (
    <div className="container px-4 mx-auto ">
      <p>Home Page</p>

      {isAdmin && (
        <div>
          <button className="p-2 px-6 mt-8 font-bold text-white bg-blue-500 rounded">
            completed surveys
          </button>
        </div>
      )}

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
