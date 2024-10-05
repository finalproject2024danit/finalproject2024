// // import PropTypes from "prop-types";
import React from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import FacebookIcon from "../../svg/Header/Facebook";
import HomeIcon from "../../svg/Header/Home";
import FriendsIcon from "../../svg/Header/Friends";
import VideoIcon from "../../svg/Header/Video";
import GroupIcon from "../../svg/Header/Group";
import GamesIcon from "../../svg/Header/Games";
import MenuIcon from "../../svg/Header/Menu";
import MessengerIcon from "../../svg/Header/Messenger";
import NotificationIcon from "../../svg/Header/Notification";
import AccountIcon from "../../svg/Header/Account";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to="/"
            >
              <div className={styles.iconWrapper}>
                <FacebookIcon />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to=""
            >
              <form action="">
                <input type="text" />
                <button>tada</button>
              </form>
            </NavLink>
          </li>
        </ul>
        <ul>
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
              to="/friends"
            >
              <FriendsIcon />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to="/video"
            >
              <VideoIcon />
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

          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to="/games"
            >
              <div className={styles.iconWrapper}>
                <GamesIcon />
              </div>
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to=""
            >
              <MenuIcon />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to=""
            >
              <MessengerIcon />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to=""
            >
              <NotificationIcon />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to=""
            >
              <AccountIcon />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
