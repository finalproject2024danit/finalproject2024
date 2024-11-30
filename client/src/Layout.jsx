import LeftSidebar from "./components/LeftSidebar/LeftSidebar.jsx";
import RightSidebar from "./components/RightSidebar/RightSidebar.jsx";
import Header from "./components/Header/index.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="inner">
      <Header />
      <div className="innerBox">
        <div className="innerMenu">
          <div>
            <LeftSidebar />
          </div>
          <div>
            <RightSidebar />
          </div>
        </div>
        <div className="mainContainer">
          <div className="menuSocial">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
