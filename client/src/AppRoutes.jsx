import { Route, Routes } from "react-router-dom";
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
import GalleryPage from "./pages/GalleryPage/GalleryPage.jsx";
import SolarSystem from "./pages/SolarSystemPage/SolarSystem.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/profile">
        <Route path="general_information" element={<GeneralInformation />} />
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
      <Route path="/gallery" element={<GalleryPage />} />
      <Route
        path="/login"
        element={<LoginPage onLoginSuccess={() => console.log("Logged in!")} />}
      />
      <Route path="/solar" element={<SolarSystem />} />
    </Routes>
  );
};

export default AppRoutes;
