import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./LeftSidebar.module.scss";
import PenIcon from "../../svg/Header/Pen";
import { useSelector } from "react-redux";

const defaultAvatarProfile =
  "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_30,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1728939216/photo_2024-10-14_23-52-52_zg5tc7.jpg";

const LeftSidebar = () => {
  // Доступ до аватара користувача з Redux
  const { avatar } = useSelector((state) => state.user);
  const userAvatar = avatar || defaultAvatarProfile;

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
        <form className={styles.menuForm}>
          <input type="text" placeholder="Search" />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className={styles.gamesLink}>
        <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/game1">Game 1</NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/game2">Game 2</NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/game3">Game 3</NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/gallery">Gallery</NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/login">Login</NavLink>
      </div>
    </aside>
  );
};

export default LeftSidebar;


