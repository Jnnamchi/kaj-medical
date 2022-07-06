import Header from "./header";

const Layout = ({ children }: any) => {
  return (
    <section className="h-screen ">
      <Header />
      <div className="h-full ">{children}</div>
    </section>
  );
};
export default Layout;
