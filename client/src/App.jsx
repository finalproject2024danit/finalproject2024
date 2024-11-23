import React, { useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import AppRoutes from "./AppRoutes";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import { Helmet } from "react-helmet-async";
import "./i18n.js";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataByToken, setToken } from "./redux/slices/userSlice";

const App = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Для перевірки токена
  // const isAuthenticated = useSelector((state) => !!state.user.id); // Якщо є користувач
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      dispatch(setToken(token)); // Зберігаємо токен в Redux
      dispatch(fetchUserDataByToken(token)); // Завантажуємо дані користувача
    }
    setIsCheckingAuth(false); // Завершуємо перевірку
  }, [dispatch]);

  if (isCheckingAuth) {
    return <div>Loading...</div>; // Можна додати спінер чи інший індикатор
  }

  return (
    <div className="container">
      <Helmet>
        <title>Galactic Connections</title>
        <meta
          name="description"
          content="Galactic Connections - reach for the stars and connect!"
        />
        <meta name="keywords" content="space, earth, galaxy, connections" />
      </Helmet>
      <AppRoutes />
      {/* {isAuthenticated ? (
        <>
          <LeftSidebar />
          <div className="inner">
            <Header />
            <div className="mainContainer">
              <div className="menuSocial">                
                <AppRoutes />
              </div>
            </div>
            <RightSidebar />
          </div>
        </>
      ) : (
        <LoginPage
          onLoginSuccess={() => {
            const token = localStorage.getItem("authToken");
            if (token) {
              dispatch(fetchUserDataByToken(token)); // Завантажуємо дані користувача після успішного входу
            }
          }}
        />
      )} */}
    </div>
  );
};

export default App;
