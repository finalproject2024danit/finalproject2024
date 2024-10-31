import React from "react";
import "./App.scss";
// import "./variables.scss";

import Header from "./components/Header";
import AppRoutes from "./AppRoutes";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import RightSidebar from "./components/RightSidebar/RightSidebar";
// import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="container">
      <LeftSidebar />     
      <div className="inner">
        <Header />
        <div>     
          <div className="mainContainer">           
            <div className="menuSocial">
              <AppRoutes />
            </div>
            <RightSidebar />           
          </div>         
        </div>
      </div> 
    </div>
  );
};

export default App;