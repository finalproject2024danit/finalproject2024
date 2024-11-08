import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./LeftSidebar.module.scss";
import ExitIcon from "../../svg/Header/Exit";
import PenIcon from "../../svg/Header/Pen";
import { useSelector } from "react-redux";

// Default avatar URL if the user doesn't have one
const defaultAvatarProfile =
  "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_30,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1728939216/photo_2024-10-14_23-52-52_zg5tc7.jpg";

const LeftSidebar = () => {
  // Access the user's avatar and name from Redux state
  const { avatar, firstName, lastName } = useSelector((state) => state.user);

  // Default to Redux value, or fallback to default avatar/profile info if not available
  const [userAvatar, setUserAvatar] = useState(avatar || defaultAvatarProfile);
  const [userName, setUserName] = useState({ firstName, lastName });

  useEffect(() => {
    // Update the local state when the Redux state changes
    setUserAvatar(avatar || defaultAvatarProfile);
    setUserName({ firstName, lastName });
  }, [avatar, firstName, lastName]);

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
      </div>

      <div className={styles.exit}>
        <div className={styles.exitBlock}>
          <img className={styles.exitBlockImg} src={userAvatar} alt="User Avatar" />
          <div className={styles.exitUser}>
            <h4>{userName.firstName}</h4>
            <h4>{userName.lastName}</h4>
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
