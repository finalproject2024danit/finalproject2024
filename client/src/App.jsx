// import React from "react";
import "./App.scss";
// import "./variables.scss";

import Header from "./components/Header";
import AppRoutes from "./AppRoutes";
// import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="container">
      <aside className="menu">
        <div>1</div>
        <div>
          <form action="">
            <input type="text" />
            <button>Search</button>
          </form>
        </div>
        <div className="exit">
          <div className="exit-block">
            <img src={"https://via.placeholder.com/30"} alt="Post image" />
            <div className="exit-user">
              <h4>Vasil Chyhnar</h4>
              <p>Online</p>
            </div>
          </div>
          <div>
            <img src={"https://via.placeholder.com/30"} alt="Post image" />
          </div>
        </div>
      </aside>

      <div className="inner">
        <Header />
        <div>
          {/* <main> */}
          <div className="main-container">
            {/* <h1>FACEBOOK</h1> */}
            <div className="menu-social">
              <AppRoutes />
            </div>
            <div className="main-menu">
              <ul>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
                <li>Friends</li>
              </ul>
            </div>
          </div>

          {/* </main> */}
        </div>
      </div>

      {/* -------------------------------------------------------------------------- */}

      {/* -------------------------------------------------------------------------- */}
      {/* <Footer/> */}
    </div>
  );
};

export default App;
