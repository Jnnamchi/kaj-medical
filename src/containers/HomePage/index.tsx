import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomePage = () => {
  const authUser = useAuthUser();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    getUserData().then((res) => {
      if (res?.self) {
        setUserData(res?.self);
      }
      if (res && (!res.self || (res.self && !res.self.user_type))) {
        router.push("/onboard");
      }
    });
  }, [authUser]);

  const getUserData = async () => {
    const token = await authUser.getIdToken();
    if (!token) {
      return;
    }

    const response = await fetch("/api/user", {
      method: "GET",
      headers: {
        Authorization: token
      }
    });
    return response.json();
  };

  const handleClickDisableBtn = async () => {
    const result = confirm(
      "Are you sure? You will not be able to receive inquiries, but your inquiry meta data will be saved for easy re-enablement"
    );
    if (result) {
      const token = await authUser.getIdToken();

      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          Authorization: token || "unauthenticated"
        },
        body: JSON.stringify({
          acceptingInquiries: false
        })
      });
      if (response.ok) {
        getUserData().then((res) => {
          if (res?.self) {
            setUserData(res?.self);
          }
        });
        router.push("/");
      }

      // Delete logic goes here
    }
  };

  return (
    <div className="container px-4 mx-auto">
      <div className="p-6 py-8 space-y-8">
        <p className="text-xl text-center">
          Hello
          <span className="ml-2 font-semibold ">{userData?.user_name}</span>
        </p>
        <div className="flex justify-center space-x-4 text-sm">
          <Link href="/survey">
            <div className="px-6 py-2 text-gray-800 cursor-pointer bg-neutral-200 ">Submit a new inquiry</div>
          </Link>
          <Link href="/submit">
            <div className="px-6 py-2 text-gray-800 cursor-pointer bg-neutral-200 ">View my Submissions</div>
          </Link>
          <Link href="/submit">
            <div className="px-6 py-2 text-gray-800 cursor-pointer bg-neutral-200 ">View my Inquiries</div>
          </Link>
        </div>
        {!userData?.acceptingInquiries ? (
          <p className="text-center ">
            You are not enabled to accept inquiries yet,
            <span
              // onClick={() => {
              //   if (userData.inquiryMetadata) {
              //     router.push("/inquiryPermission/edit");
              //   } else {
              //     router.push("/inquiryPermission/create");
              //   }
              // }}
              onClick={()=>router.push('/inquiry')}
              className="ml-2 underline cursor-pointer ">
              enable yourself now.
            </span>
          </p>
        ) : (
          <p className="text-center ">
            You are enabled for accepting inquiries,
            <span onClick={() => router.push("/inquiryPermission/edit")} className="ml-2 underline cursor-pointer ">
              edit your details
            </span>
            {" or "}
            <span onClick={handleClickDisableBtn} className="underline cursor-pointer ">
              disable yourself now
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(HomePage);
