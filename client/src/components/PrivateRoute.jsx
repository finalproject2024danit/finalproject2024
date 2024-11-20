import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated }) => {
  // Якщо користувач автентифікований, то рендеримо дочірні маршрути (Outlet)
  // Якщо ні, перенаправляємо на сторінку логіну
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
