import {useEffect, useState} from "react";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import {Helmet} from "react-helmet-async";
import "./i18n.js";
import {useDispatch} from "react-redux";
import {fetchUserDataByToken, setToken} from "./redux/slices/userSlice";

const App = () => {
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token) {
            dispatch(setToken(token));
            dispatch(fetchUserDataByToken(token));
        }
        setIsCheckingAuth(false);
    }, [dispatch]);

    if (isCheckingAuth) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <Helmet>
                <title>Galactic Connections</title>
                <meta
                    name="description"
                    content="Galactic Connections - reach for the stars and connect!"
                />
                <meta name="keywords" content="space, earth, galaxy, connections"/>
            </Helmet>
            <AppRoutes/>
        </div>
    );
};

export default App;
