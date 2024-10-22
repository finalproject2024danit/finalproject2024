// // import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import UsersIcon from "../../svg/Header/Users";
import GroupIcon from "../../svg/Header/Group";
import HomeIcon from "../../svg/Header/Home";
import ChatIcon from "../../svg/Header/Chat";
// import AccountIcon from "../../svg/Header/Account";
// import MenuIcon from "../../svg/Header/Menu";
// import MessengerIcon from "../../svg/Header/Messenger";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header>
      <div className={styles.skyContainer}>
        <span className={styles.star}></span>
        <span className={styles.star}></span>
        <span className={styles.star}></span>
        <span className={styles.star}></span>
        <span className={styles.star}></span>
        <span className={styles.star}></span>
        <span className={styles.star}></span>
        <span className={styles.star}></span>
        <span className={styles.star}></span>
        <span className={styles.star}></span>
      </div>

      <div className={styles.headerTop}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="/"
        >
          <div className={styles.iconWrapper}>
            <h1>Title - Slogan!!!!!!!!!!!!!!!!!!!!</h1>
          </div>
        </NavLink>
      </div>
      <div className={styles.headerBottom}>
        <nav>
          <ul className={styles.headerNav}>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to="/"
              >
                <HomeIcon />
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to="/users"
              >
                <UsersIcon />
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to="/chat"
              >
                <div className={styles.iconWrapper}>
                  <ChatIcon />
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to="/group"
              >
                <div className={styles.iconWrapper}>
                  <GroupIcon />
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
