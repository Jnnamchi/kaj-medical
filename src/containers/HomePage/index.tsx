import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HomePage = () => {
  const authUser = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    getUserData().then(res => {
      console.log('🚀 ~ file: index.tsx ~ line 11 ~ saveOnboardData ~ res', res);
      if (res && (!res.self || (res.self && !res.self.user_type))) {
        router.push('/onboard');
      }
    });
  }, [authUser]);

  const getUserData = async () => {
    const token = await authUser.getIdToken();
    if (!token) {
      return;
    }

    const response = await fetch('/api/user', {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });
    return response.json();
  };

  return (
    <div className="container px-4 mx-auto">
      <div className="p-6 py-8 space-y-8">
        <div></div>
        <div className="flex justify-center space-x-4 text-sm">
          <Link href="/survey">
            <div className="px-6 py-2 text-gray-800 cursor-pointer bg-neutral-200 ">Submit a new inquiry</div>
          </Link>

          <div className="px-6 py-2 text-gray-800 cursor-pointer bg-neutral-200 ">View my inquiries</div>
        </div>
      </div>
    </div>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(HomePage);
