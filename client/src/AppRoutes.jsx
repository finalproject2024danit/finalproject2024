import { Navigate, Route, Routes } from "react-router-dom";
import RightSidebar from "./components/RightSidebar/RightSidebar.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import GroupPage from "./pages/GroupPage/GroupPage.jsx";
import ChatPage from "./pages/ChatPage/ChatPage.jsx";
import UsersPage from "./pages/UsersPage/UsersPage.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";
import GeneralInformation from "./pages/ProfilePage/GeneralInformation/GeneralInformation.jsx";
import PlaceOfResidence from "./pages/ProfilePage/PlaceOfResidence/PlaceOfResidence.jsx";
import Hobbies from "./pages/ProfilePage/Hobbies/Hobbies.jsx";
import Workplace from "./pages/ProfilePage/Workplace/Workplace.jsx";
import PhotoLibrary from "./pages/ProfilePage/PhotoLibrary/PhotoLibrary.jsx";
import Game1 from "./pages/Games/Game1/Game1.jsx";
import Game2 from "./pages/Games/Game2/Game2.jsx";
import Game3 from "./pages/Games/Game3/Game3.jsx";
import SolarSystem from "./pages/SolarSystemPage/SolarSystem.jsx";
import { useSelector } from "react-redux";
import Layout from "./Layout.jsx";
import { useEffect, useState } from "react";
import NewsPage from "./pages/NewsPage/NewsPage.jsx";

const AppRoutes = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    console.log("Token updated:", token);
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallScreen = windowWidth <= 768;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {!token ? (
        <Route path="*" element={<Navigate to="/login" replace />} />
      ) : (
        <>
          <Route element={<Layout />}>
            <Route
              path="/friends"
              element={isSmallScreen ? <RightSidebar /> : null}
            />
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/profile">
              <Route
                path="general_information"
                element={<GeneralInformation />}
              />
              <Route path="place_of_residence" element={<PlaceOfResidence />} />
              <Route path="hobbies" element={<Hobbies />} />
              <Route path="workplace" element={<Workplace />} />
              <Route path="photo_library" element={<PhotoLibrary />} />
            </Route>
            <Route path="/groups" element={<GroupPage />} />
            <Route path="/group/:id" element={<GroupPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/game1" element={<Game1 />} />
            <Route path="/game2" element={<Game2 />} />
            <Route path="/game3" element={<Game3 />} />
            <Route path="/gallery" element={<PhotoLibrary />} />
            <Route path="/solar" element={<SolarSystem />} />
            <Route path="/news/:id" element={<NewsPage />} />
          </Route>
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
