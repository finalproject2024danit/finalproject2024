import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Select from "react-select";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";  // Import the hook
import styles from "./LeftSidebar.module.scss";
import PenIcon from "../../svg/Header/Pen";
import { fetchSearchResults } from "../../redux/slices/searchSlice";

const defaultAvatarProfile =
    "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_30,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1728939216/photo_2024-10-14_23-52-52_zg5tc7.jpg";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { avatar } = useSelector((state) => state.user);
  const userAvatar = avatar || defaultAvatarProfile;

  const { results, isLoading } = useSelector((state) => state.globalsearch);

  const { t } = useTranslation(); // Access translation function

  const handleSearch = async (inputValue) => {
    if (!inputValue) return;
    dispatch(fetchSearchResults(inputValue));
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      const [type, id] = selectedOption.value.split("-");
      console.log(`Selected ${type} ID:`, id);

      const route = type === "user" ? `/user/${id}` : `/group/${id}`;

      if (type === "group") {
        navigate(`/group/${id}`);
      }

      navigate(route);
    }
  };

  return (
      <aside className={`${styles.leftMenu} ${styles.shinyCta}`}>
        <div>
          <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to="/profile/general_information"
          >
            <div className={styles.iconWrapper}>
              <img alt="User Avatar" src={userAvatar} />
              <PenIcon />
            </div>
          </NavLink>
        </div>

        <div>
          <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
            {({ setFieldValue }) => (
                <Form className={styles.menuForm}>
                  <Select
                      options={results}
                      placeholder={t("leftSidebar.globalSearch")}
                      className={styles.select}
                      isLoading={isLoading}
                      onInputChange={(inputValue) => {
                        handleSearch(inputValue);
                        setFieldValue("search", inputValue);
                      }}
                      onChange={handleSelectChange}
                      isSearchable
                      getOptionLabel={(e) => e.label}
                  />
                </Form>
            )}
          </Formik>
        </div>

        <div className={styles.gamesLink}>
          <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/game1">
            {t("leftSidebar.game1")}
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/game2">
            {t("leftSidebar.game2")}
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/game3">
            {t("leftSidebar.game3")}
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/gallery">
            {t("leftSidebar.gallery")}
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/login">
            {t("leftSidebar.login")}
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/solar">
            {t("leftSidebar.solarSystem")}
          </NavLink>
        </div>
      </aside>
  );
};

export default LeftSidebar;
