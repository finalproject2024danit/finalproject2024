import LeftSidebar from "./components/LeftSidebar/LeftSidebar.jsx";
import RightSidebar from "./components/RightSidebar/RightSidebar.jsx";
import Header from "./components/Header/index.jsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <LeftSidebar/>
            <div className="inner">
                <Header/>
                <div className="mainContainer">
                    <div className="menuSocial">
                        <Outlet />
                    </div>
                </div>
            </div>
            <RightSidebar/>
        </>
    );
};

export default Layout;