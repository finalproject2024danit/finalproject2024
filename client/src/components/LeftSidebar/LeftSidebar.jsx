import React from "react";
// import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom"; // Додаємо імпорт NavLink
import Select from "react-select";
import { Formik, Form } from "formik";
import styles from "./LeftSidebar.module.scss";
import PenIcon from "../../svg/Header/Pen";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../../redux/slices/searchSlice"; // Імпортуємо action з Redux

const defaultAvatarProfile =
  "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_30,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1728939216/photo_2024-10-14_23-52-52_zg5tc7.jpg";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Використовуємо useNavigate
  const { avatar } = useSelector((state) => state.user);
  const userAvatar = avatar || defaultAvatarProfile;

  const { results, isLoading } = useSelector((state) => state.globalsearch); // Отримуємо результати з Redux

  const handleSearch = async (inputValue) => {
    if (!inputValue) return; // Якщо введено порожній рядок, не робимо запит

    dispatch(fetchSearchResults(inputValue)); // Викликаємо Redux для пошуку
  };

  // const [groupOptions, setGroupOptions] = useState([]);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      const [type, id] = selectedOption.value.split("-"); // Розбираємо тип і ID
      console.log(`Selected ${type} ID:`, id);

      // Генеруємо шлях для переходу
      const route = type === "user" ? `/user/${id}` : `/group/${id}`;
      
      if (type === "group") {
        navigate(`/group/${id}`); // Передаємо ID через URL
      }

      // Перехід на сторінку вибраного елемента
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
                options={results} // Використовуємо результати пошуку з Redux
                placeholder="Global Search"
                className={styles.select}
                isLoading={isLoading}
                onInputChange={(inputValue) => {
                  handleSearch(inputValue);
                  setFieldValue("search", inputValue); // Оновлюємо значення в Formik
                }}
                onChange={handleSelectChange} // Обробник вибору
                isSearchable
                getOptionLabel={(e) => e.label} // Налаштовуємо, щоб рендерити label як текст у списку
              />
            </Form>
          )}
        </Formik>
      </div>

      <div className={styles.gamesLink}>
        <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/game1">Game 1</NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/game2">Game 2</NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/game3">Game 3</NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/gallery">Gallery</NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/login">Login</NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/solar">Solar System</NavLink>
      </div>
    </aside>
  );
};

export default LeftSidebar;

