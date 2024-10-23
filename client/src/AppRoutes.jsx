// import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
// import LoginPage from "./pages/LoginPage/LoginPage.jsx";
// import MessengerPage from "./pages/MessengerPage/MessengerPage.jsx";
import GroupPage from "./pages/GroupPage/GroupPage.jsx";
import ChatPage from "./pages/ChatPage/ChatPage.jsx";
import UsersPage from "./pages/UsersPage/UsersPage.jsx";
import AccountPage from "./pages/AccountPage/AccountPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";
// import PrivateRoute from "./components/PrivateRoute.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/login" element={<LoginPage />} /> */}
      {/* <Route path="/" */}
      <Route
        path="/"
        element={
          // <PrivateRoute>
            <HomePage />
          // </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          // <PrivateRoute>
            <UsersPage />
          // </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          // <PrivateRoute>
            <ProfilePage />
          // </PrivateRoute>
        }
      />
      <Route
        path="/group"
        element={
          // <PrivateRoute>
            <GroupPage />
          // </PrivateRoute>
        }
      />
      <Route
        path="/chat"
        element={
          // <PrivateRoute>
            <ChatPage />
          // </PrivateRoute>
        }
      />
      <Route
        path="/user"
        element={
          // <PrivateRoute>
            <UserPage />
          // </PrivateRoute>
        }
      />
      {/* <Route
        path="/messenger"
        element={
          // <PrivateRoute>
            <MessengerPage />
          // </PrivateRoute>
        }
      /> */}
      <Route path="/account" element={<AccountPage />} />
    </Routes>
  );
};

export default AppRoutes;
