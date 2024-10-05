import React from "react";
import "./App.scss";
// import "./variables.scss";

import Header from "./components/Header";
import AppRoutes from "./AppRoutes";

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
