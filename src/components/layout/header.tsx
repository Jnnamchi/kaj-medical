import { useAuthUser, withAuthUser } from 'next-firebase-auth';

const Header = () => {
  const authUser = useAuthUser();

  const logout = authUser.signOut;
  return (
    <div className="w-full p-4 px-12 bg-no-repeat bg-cover bg-header">
      <div className="flex justify-end text-white ">
        <p className="cursor-pointer " onClick={logout}>
          Log out
        </p>
      </div>
    </div>
  );
};
export default withAuthUser({})(Header);
