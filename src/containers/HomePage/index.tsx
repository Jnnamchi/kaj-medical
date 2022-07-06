import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { database } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import { userTypeOptions } from "../../utils/data";

const HomePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const databaseRef = collection(database, "User Data");
  const [userData, setUserData] = useState<any>();

  const getData = async () => {
    const userDB = await getDocs(databaseRef);
    const users: any = userDB.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    const self = users.find((data: any) => data.email === user.email);
    if (self) {
      setUserData(self);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (userData && !userData.user_type) {
      router.push("/onboarding");
    }
  }, [userData]);

  return (
    <div className="container px-4 mx-auto">
      <section className="h-screen ">
        <div className="p-6 py-8 space-y-8">
          <div>
            {userData && (
              <>
                <p className="text-2xl text-center">
                  Welcome, {userData.user_name} !
                </p>
                {/* userData.user_type */}
                <p className="mt-4 text-sm text-center">
                  {
                    userTypeOptions.find(
                      (option) => option.value === userData.user_type
                    )?.label
                  }{" "}
                </p>
              </>
            )}
          </div>
          <div className="flex justify-center space-x-4 text-sm">
            <div className="px-6 py-2 text-gray-800 cursor-pointer bg-neutral-200 ">
              Submit a new inquiry
            </div>
            <div className="px-6 py-2 text-gray-800 cursor-pointer bg-neutral-200 ">
              View my inquiries
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
