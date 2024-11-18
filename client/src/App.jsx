import React from "react";
import "./App.scss";
// import "./variables.scss";
import Header from "./components/Header";
import AppRoutes from "./AppRoutes";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import {Helmet} from "react-helmet-async";
import './i18n.js';
// import Footer from "./components/Footer/Footer";

const App = () => {

    return (
        
        <div className="container">
            <Helmet>
                <title>Galactic Connections</title>
                <meta name='description' content='Galactic Connections - reach for the and connect!'/>
                <meta name='keywords' content='space, earth, galaxy, connections'/>
            </Helmet>
            <LeftSidebar/>
            <div className="inner">
                <Header/>
                <div>
                    <div className="mainContainer">
                        <div className="menuSocial">
                            <AppRoutes/>
                        </div>
                        <RightSidebar/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;