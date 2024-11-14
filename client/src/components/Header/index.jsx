// // import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import UsersIcon from "../../svg/Header/Users";
import GroupIcon from "../../svg/Header/Group";
import HomeIcon from "../../svg/Header/Home";
import ChatIcon from "../../svg/Header/Chat";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.headerBox}>
      <header className={styles.shinyCta}>
        {/* <div className={styles.skyContainer}>
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
      </div> */}
        <div className={styles.logoBox}>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/"
          >
            <img
              className={styles.imgLogo}
              src="/logoGif.gif"
              alt="Galactic Connections Logo"
            />
          </NavLink>
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to="/"
              >
                <h1>
                  Galactic Connections &quot;Reach for the and connect!&quot;
                </h1>
              </NavLink>
            </div>
            <div className={styles.headerBottom}>
              <nav>
                <ul className={styles.headerNav}>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? styles.active : ""
                      }
                      to="/"
                    >
                      <HomeIcon />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? styles.active : ""
                      }
                      to="/users"
                    >
                      <UsersIcon />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? styles.active : ""
                      }
                      to="/chat"
                    >
                      <div className={styles.iconWrapper}>
                        <ChatIcon />
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? styles.active : ""
                      }
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
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
