import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import VideoPage from "./pages/VideoPage/VideoPage.jsx";
import GroupPage from "./pages/GroupPage/GroupPage.jsx";
import GamesPage from "./pages/GamesPage/GamesPage.jsx";
import FriendsPage from "./pages/FriendsPage/FriendsPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/" */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/friends"
        element={
          <PrivateRoute>
            <FriendsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/video"
        element={
          <PrivateRoute>
            <VideoPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/group"
        element={
          <PrivateRoute>
            <GroupPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/games"
        element={
          <PrivateRoute>
            <GamesPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
