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
import { fetchSearchResults } from "../../redux/slices/searchSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Для перенаправления при выборе игры
  const { results, isLoading } = useSelector((state) => state.globalsearch);

  const [isChecked, setIsChecked] = useState(i18n.language === "ua");
  const [selectedGame, setSelectedGame] = useState(""); // Выбранная игра
  const [menuPlacement, setMenuPlacement] = useState("bottom");

  useEffect(() => {
    const handleResize = () => {
      setMenuPlacement(window.innerWidth <= 768 ? "top" : "bottom");
    };

    handleResize(); // Set the initial placement
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      backgroundColor: "#fff", // Белый фон для поля ввода
      color: "#000", // Черный текст
      borderColor: "#ccc", // Светло-серая рамка
      boxShadow: "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#fff", // Белый фон для выпадающего списка
      zIndex: 100,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e6f7ff" : "#fff", // Синий фон при наведении
      color: "#000", // Черный текст
      cursor: "pointer",
    }),
    menuPlacement: "top", // Это заставит меню подниматься вверх
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
                  Galactic Connections <span className={styles.headerSlogan}>&quot;Reach for the stars and
                  connect!&quot;</span>
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
                        styles={customStyles} // Передаем стили в Select
                        isLoading={isLoading}
                        onInputChange={(inputValue) => {
                          handleSearch(inputValue);
                          setFieldValue("search", inputValue);
                        }}
                        onChange={handleSelectChange}
                        isSearchable
                        getOptionLabel={(e) => e.label}
                        menuPlacement={menuPlacement} // This ensures the dropdown opens upwards
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
