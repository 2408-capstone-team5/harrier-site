import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { TopNavBar } from "./TopNavBar";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <TopNavBar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;