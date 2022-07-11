import Link from "next/link";
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
    } else {
      router.push("/onboard");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container px-4 mx-auto">
      <div className="p-6 py-8 space-y-8">
        <div>
          {userData && (
            <>
              <p className="text-2xl text-center">
                Welcome, {userData.user_name} !
              </p>
              <p className="mt-4 text-sm text-center">
                {
                  userTypeOptions.find(
                    (option) => option.value === userData.user_type
                  )?.label
                }
              </p>
            </>
          )}
        </div>
        <div className="flex justify-center space-x-4 text-sm">
          <Link href="/survey">
            <div className="px-6 py-2 text-gray-800 cursor-pointer bg-neutral-200 ">
              Submit a new inquiry
            </div>
          </Link>

          <div className="px-6 py-2 text-gray-800 cursor-pointer bg-neutral-200 ">
            View my inquiries
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
