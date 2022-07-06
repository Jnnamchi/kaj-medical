import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { logout } = useAuth();

  return (
    <div className="p-4 bg-green-100">
      <div className="flex justify-between ">
        <p>Header</p>
        <p className="cursor-pointer " onClick={logout}>
          Log out
        </p>
      </div>
    </div>
  );
};
export default Header;
