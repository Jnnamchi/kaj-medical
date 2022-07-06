import Header from "./header";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
export default Layout;
