import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-grow mx-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;