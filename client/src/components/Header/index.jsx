import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import UsersIcon from "../../svg/Header/Users";
import GroupIcon from "../../svg/Header/Group";
import HomeIcon from "../../svg/Header/Home";
import ChatIcon from "../../svg/Header/Chat";
import FriendsIcon from "../../svg/Header/Friends";
import PenIcon from "../../svg/Header/Pen";
import styles from "./Header.module.scss";

import {useDispatch, useSelector} from "react-redux";
import {toggleLanguage} from "../../redux/slices/languageSlice.js";

import { fetchSearchResults } from "../../redux/slices/searchSlice";


const Header = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { results, isLoading } = useSelector((state) => state.globalsearch);

  const [isChecked, setIsChecked] = useState(i18n.language === "ua");
  const [selectedGame, setSelectedGame] = useState("");

  const language = useSelector((state) => state.language.language);
  const dispatch = useDispatch();
  const [menuPlacement, setMenuPlacement] = useState("bottom");

  useEffect(() => {
    const handleResize = () => {
      setMenuPlacement(window.innerWidth <= 768 ? "top" : "bottom");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleLanguageToggle = () => {
    dispatch(toggleLanguage());
  };

  const handleGameChange = (event) => {
    const game = event.target.value;
    setSelectedGame(game);
    if (game) {
      navigate(game);
    }
  };

  const handleSearch = async (inputValue) => {
    if (!inputValue) return;
    dispatch(fetchSearchResults(inputValue));
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      const [type, id] = selectedOption.value.split("-");

      const route = type === "user" ? `/user/${id}` : `/group/${id}`;

      if (type === "group") {
        navigate(`/group/${id}`);
      }
      navigate(route);
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#fff",
      color: "#000",
      borderColor: "#ccc",
      boxShadow: "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#fff",
      zIndex: 100,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e6f7ff" : "#fff",
      color: "#000",
      cursor: "pointer",
    }),
    menuPlacement: "top",
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
                  Galactic Connections{" "}
                  <span className={styles.headerSlogan}>
                    &quot;Reach for the stars and connect!&quot;
                  </span>
                </h1>
              </NavLink>
              <div className={styles.radioBtn}>
                <input
                    type="checkbox"
                    checked={language === "ua"}
                    onChange={handleLanguageToggle}
                    id="languageToggle"
                />
                <label htmlFor="languageToggle">
                  {language === "ua" ? "UA" : "EN"}
                </label>
              </div>

            </div>
            <div className={styles.headerBottom}>
              <nav>
                <ul className={styles.headerNav}>
                  <li>
                    <NavLink
                        className={({isActive}) =>
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
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? styles.active : ""
                      }
                      to="/friends"
                    >
                      <FriendsIcon />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? styles.active : ""
                      }
                      to="/profile/general_information"
                    >
                      <PenIcon />
                    </NavLink>
                  </li>
                  <li>
                    <div className={styles.gamesSelect}>
                      <select
                        value={selectedGame}
                        onChange={handleGameChange}
                        className={styles.gameDropdown}
                      >
                        <option value="">{t("leftSidebar.games")}</option>
                        <option value="/game1">{t("leftSidebar.game1")}</option>
                        <option value="/game2">{t("leftSidebar.game2")}</option>
                        <option value="/game3">{t("leftSidebar.game3")}</option>
                        <option value="/solar">
                          {t("leftSidebar.solarSystem")}
                        </option>
                      </select>
                    </div>
                  </li>
                  <li>
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
                  </li>
                </ul>
              </nav>
              <div className={styles.searchContainer}>
                <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
                  {({ setFieldValue }) => (
                    <Form className={styles.menuForm}>
                      <Select
                        options={results}
                        placeholder={t("Search")}
                        className={styles.selectForm}
                        styles={customStyles}
                        isLoading={isLoading}
                        onInputChange={(inputValue) => {
                          handleSearch(inputValue);
                          setFieldValue("search", inputValue);
                        }}
                        onChange={handleSelectChange}
                        isSearchable
                        getOptionLabel={(e) => e.label}
                        menuPlacement={menuPlacement}
                      />
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
