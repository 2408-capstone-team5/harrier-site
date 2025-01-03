import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { TopNavBar } from "./TopNavBar";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col">
        <TopNavBar />
          <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
