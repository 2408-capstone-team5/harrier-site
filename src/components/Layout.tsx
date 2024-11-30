import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;