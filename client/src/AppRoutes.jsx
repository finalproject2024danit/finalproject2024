// import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
// import LoginPage from "./pages/LoginPage/LoginPage.jsx";
// import MessengerPage from "./pages/MessengerPage/MessengerPage.jsx";
import GroupPage from "./pages/GroupPage/GroupPage.jsx";
import ChatPage from "./pages/ChatPage/ChatPage.jsx";
import UsersPage from "./pages/UsersPage/UsersPage.jsx";
// import AccountPage from "./pages/AccountPage/AccountPage.jsx"; !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";
import GeneralInformation from "./pages/ProfilePage/GeneralInformation/GeneralInformation.jsx";
import PlaceOfResidence from "./pages/ProfilePage/PlaceOfResidence/PlaceOfResidence.jsx";
import Hobbies from "./pages/ProfilePage/Hobbies/Hobbies.jsx";
import Workplace from "./pages/ProfilePage/Workplace/Workplace.jsx";
import PhotoLibrary from "./pages/ProfilePage/PhotoLibrary/PhotoLibrary.jsx";
// import PrivateRoute from "./components/PrivateRoute.jsx";

import Game1 from "./pages/Games/Game1/Game1.jsx";
import Game2 from "./pages/Games/Game2/Game2.jsx";
import Game3 from "./pages/Games/Game3/Game3.jsx";
import GalleryPage from "./pages/GalleryPage/GalleryPage.jsx";

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
        // element={
        //     <ProfilePage/>
        // }
      >
        <Route path="general_information" element={<GeneralInformation />} />
        <Route path="place_of_residence" element={<PlaceOfResidence />} />
        <Route path="hobbies" element={<Hobbies />} />
        <Route path="workplace" element={<Workplace />} />
        <Route path="photo_library" element={<PhotoLibrary />} />
      </Route>

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
        path="/user/:id"
        element={
          // <PrivateRoute>
          <UserPage />
          // </PrivateRoute>
        }
      />

      <Route
        path="/game1"
        element={
          // <PrivateRoute>
          <Game1 />
          // </PrivateRoute>
        }
      />
      <Route
        path="/game2"
        element={
          // <PrivateRoute>
          <Game2 />
          // </PrivateRoute>
        }
      />
      <Route
        path="/game3"
        element={
          // <PrivateRoute>
          <Game3 />
          // </PrivateRoute>
        }
      />

      <Route
        path="/gallery"
        element={
          // <PrivateRoute>
          <GalleryPage />
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
      {/* <Route path="/account" element={<AccountPage />} /> !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
    </Routes>
  );
};

export default AppRoutes;
