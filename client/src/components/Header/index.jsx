// // import PropTypes from "prop-types";
// import React from "react";
import { NavLink } from "react-router-dom";
import AccountIcon from "../../svg/Header/Account.jsx";
import FacebookIcon from "../../svg/Header/Facebook.jsx";
import FriendsIcon from "../../svg/Header/Friends.jsx";
import GamesIcon from "../../svg/Header/Games.jsx";
import GroupIcon from "../../svg/Header/Group.jsx";
import HomeIcon from "../../svg/Header/Home.jsx";
import MenuIcon from "../../svg/Header/Menu.jsx";
import MessengerIcon from "../../svg/Header/Messenger.jsx";
import NotificationIcon from "../../svg/Header/Notification.jsx";
import VideoIcon from "../../svg/Header/Video.jsx";
import styles from "./Header.module.scss";

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
                {/* <span>FacebookIcon</span> */}
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
              {/* <span>HomeIcon</span> */}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to="/friends"
            >
              <FriendsIcon />
              {/* <span>FriendsIcon</span> */}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to="/video"
            >
              <VideoIcon />
              {/* <span>VideoIcon</span> */}
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to="/group"
            >
              <div className={styles.iconWrapper}>
                <GroupIcon />
                {/* <span>GroupIcon</span> */}
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
                {/* <span>GamesIcon</span> */}
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
              {/* <span>MenuIcon</span> */}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to=""
            >
              <MessengerIcon />
              {/* <span>MessengerIcon</span> */}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to=""
            >
              <NotificationIcon />
              {/* <span>NotificationIcon</span> */}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to=""
            >
              <AccountIcon />
              {/* <span>AccountIcon</span> */}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
