import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UsersIcon from "../../svg/Header/Users";
import GroupIcon from "../../svg/Header/Group";
import HomeIcon from "../../svg/Header/Home";
import ChatIcon from "../../svg/Header/Chat";
import styles from "./Header.module.scss";

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Для перенаправления при выборе игры

  const [isChecked, setIsChecked] = useState(i18n.language === "ua");
  const [selectedGame, setSelectedGame] = useState(""); // Выбранная игра

  useEffect(() => {
    setIsChecked(i18n.language === "ua");
  }, [i18n.language]);

  const handleLanguageChange = () => {
    const newLang = isChecked ? "en" : "ua";
    i18n.changeLanguage(newLang);
  };

  const handleGameChange = (event) => {
    const game = event.target.value;
    setSelectedGame(game);
    if (game) {
      navigate(game); // Переход на страницу игры
    }
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
                  Galactic Connections &quot;Reach for the stars and
                  connect!&quot;
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
                  <li>
                    <div className={styles.gamesSelect}>
                      <select
                        value={selectedGame}
                        onChange={handleGameChange}
                        className={styles.gameDropdown}
                      >
                        {/* <option value="">{t("header.selectGame")}</option> */}
                        
                        <option value="/game1">{t("leftSidebar.game1")}</option>
                        <option value="/game2">{t("leftSidebar.game2")}</option>
                        <option value="/game3">{t("leftSidebar.game3")}</option>
                        <option value="/solar">{t("leftSidebar.solarSystem")}</option>
                      </select>
                    </div>
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
