import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
// import "./variables.scss";

import Header from "./components/Header";
import AppRoutes from "./AppRoutes";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";

const App = () => {
  return (
    <>
      <Header />

      <main>
        <h1>FACEBOOK</h1>
        <AppRoutes />
      </main>

      {/* -------------------------------------------------------------------------- */}

      {/* -------------------------------------------------------------------------- */}
    </>
  );
};

export default App;
