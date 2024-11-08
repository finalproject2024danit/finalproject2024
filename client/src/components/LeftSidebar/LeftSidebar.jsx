import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./LeftSidebar.module.scss";
import ExitIcon from "../../svg/Header/Exit";
import PenIcon from "../../svg/Header/Pen";

const defaultAvatarProfile =
  "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_30,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1728939216/photo_2024-10-14_23-52-52_zg5tc7.jpg";
const LeftSidebar = () => {
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || defaultAvatarProfile
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || {
      firstName: "",
      lastName: "",
    }
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setAvatar(localStorage.getItem("avatar") || defaultAvatarProfile);
      setUserData(
        JSON.parse(localStorage.getItem("userData")) || {
          firstName: "",
          lastName: "",
        }
      );
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userDataUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userDataUpdated", handleStorageChange);
    };
  }, []);

  return (
    <aside className={`${styles.leftMenu} ${styles.shinyCta}`}>
      <div>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="/profile/general_information"
        >
          <div className={styles.iconWrapper}>
            <img alt="" src={avatar} />
            <PenIcon />
          </div>
        </NavLink>
      </div>
      <div>
        <form className={styles.menuForm} action="">
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </form>
      </div>

      <div className={styles.gamesLink}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="/game1"
        >
          Game 1
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="/game2"
        >
          Game 2
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="/game3"
        >
          Game 3
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="/gallery"
        >
          Gallery
        </NavLink>
      </div>

      <div className={styles.exit}>
        <div className={styles.exitBlock}>
          <img className={styles.exitBlockImg} src={avatar} alt="" />
          <div className={styles.exitUser}>
            <h4>{userData.firstName}</h4>
            <h4>{userData.lastName}</h4>
          </div>
        </div>
        <div>
          <a className={styles.exitBtn}>
            <ExitIcon />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
