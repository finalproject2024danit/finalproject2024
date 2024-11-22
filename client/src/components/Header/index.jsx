import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import UsersIcon from "../../svg/Header/Users";
import GroupIcon from "../../svg/Header/Group";
import HomeIcon from "../../svg/Header/Home";
import ChatIcon from "../../svg/Header/Chat";
import styles from "./Header.module.scss";

const Header = () => {
  const { t, i18n } = useTranslation();

  // Устанавливаем начальное состояние в зависимости от текущего языка
  const [isChecked, setIsChecked] = useState(i18n.language === 'ua');

  useEffect(() => {
    // Когда язык меняется, обновляем состояние isChecked
    setIsChecked(i18n.language === 'ua');
  }, [i18n.language]);

  const handleLanguageChange = () => {
    const newLang = isChecked ? 'en' : 'ua'; // Переключаем между 'en' и 'ua'
    i18n.changeLanguage(newLang); // Меняем язык
  };

  return (
      <div className={styles.headerBox}>
        <header className={styles.shinyCta}>
          <div className={styles.logoBox}>
            <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to="/"
            >
              <img
                  className={styles.imgLogo}
                  src="/logoGif.gif"
                  alt="Galactic Connections Logo"
                  title="Galactic Connections Logo"
              />
            </NavLink>
            <div className={styles.header}>
              <div className={styles.headerTop}>
                <NavLink
                    className={({ isActive }) => (isActive ? styles.active : "")}
                    to="/"
                >
                  <h1>
                    Galactic Connections &quot;Reach for the stars and connect!&quot;
                  </h1>
                </NavLink>
                <div className={styles.radioBtn}>
                  <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleLanguageChange}
                      id="languageToggle"
                  />
                  <label htmlFor="languageToggle">
                    {isChecked ? "UA" : "EN"}
                  </label>
                </div>
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
                        <ChatIcon />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                          className={({ isActive }) =>
                              isActive ? styles.active : ""
                          }
                          to="/groups"
                      >
                        <GroupIcon />
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
