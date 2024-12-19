import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import GroupPage from "./pages/GroupPage/GroupPage.jsx";
import ChatPage from "./pages/ChatPage/ChatPage.jsx";
import FriendsPage from "./pages/FriendsPage/FriendsPage.jsx";
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
import {useDispatch, useSelector} from "react-redux";
import Layout from "./Layout.jsx";
import {useEffect} from "react";
import NewsPage from "./pages/NewsPage/NewsPage.jsx";
import {fetchNewToken} from "./redux/slices/userSlice.js";

const AppRoutes = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const currentTimestamp = Date.now();
    const tokenExpirationDate = localStorage.getItem("authTokenExpirationDate");
    const refreshToken = localStorage.getItem("refreshToken");
    const refreshTokenExpirationDate = localStorage.getItem("refreshTokenExpirationDate");

    if (currentTimestamp >= tokenExpirationDate) {
        dispatch(fetchNewToken(refreshToken));
    }

    const isRefreshTokenExpired = !refreshToken || currentTimestamp >= refreshTokenExpirationDate;

    useEffect(() => {
        console.log("Token updated:", token);
    }, [token]);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>

            {isRefreshTokenExpired ? (
                <Route path="*" element={<Navigate to="/login" replace/>}/>
            ) : (
                <>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/users" element={<UsersPage/>}/>
                        <Route path="/profile">
                            <Route path="general_information" element={<GeneralInformation/>}/>
                            <Route path="place_of_residence" element={<PlaceOfResidence/>}/>
                            <Route path="hobbies" element={<Hobbies/>}/>
                            <Route path="workplace" element={<Workplace/>}/>
                            <Route path="photo_library" element={<PhotoLibrary/>}/>
                        </Route>
                        <Route path="/groups" element={<GroupPage/>}/>
                        <Route path="/group/:id" element={<GroupPage/>}/>
                        <Route path="/chat" element={<ChatPage/>}/>
                        <Route path="/friends" element={<FriendsPage/>}/>
                        <Route path="/user/:id" element={<UserPage/>}/>
                        <Route path="/game1" element={<Game1/>}/>
                        <Route path="/game2" element={<Game2/>}/>
                        <Route path="/game3" element={<Game3/>}/>
                        <Route path="/gallery" element={<PhotoLibrary/>}/>
                        <Route path="/solar" element={<SolarSystem/>}/>
                        <Route path="/news/:id" element={<NewsPage/>}/>
                    </Route>
                </>
            )}
        </Routes>
    );
};

export default AppRoutes;
