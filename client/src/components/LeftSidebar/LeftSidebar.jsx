// import React from 'react';
import { NavLink } from "react-router-dom";
import styles from './LeftSidebar.module.scss'
import ExitIcon from "../../svg/Header/Exit";
import PenIcon from "../../svg/Header/Pen";


const LeftSidebar = () => {
  return (
   

    <aside className={styles.menu}>
        <div>
        <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to="/profile"            >
              <div className={styles.iconWrapper}>
              <img src={"https://res.cloudinary.com/dsr6kwzrr/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1728939216/photo_2024-10-14_23-52-52_zg5tc7.jpg"} alt="Post image" />
              <PenIcon/>
              </div>
            </NavLink>
        </div>
        <div>
          <form className={styles.menuForm} action="">
            <input type="text" placeholder="SHTOTO-TAM" />
            <button>Search</button>
          </form>
        </div>
        <div className={styles.exit}>
          <div className={styles.exitBlock}>
            <img className={styles.exitBlockImg} src={"https://res.cloudinary.com/dsr6kwzrr/image/upload/w_70,c_fill,ar_1:1,g_auto,r_max,b_rgb:0D0F10/v1728939216/photo_2024-10-14_23-52-52_zg5tc7.jpg"} alt="Post image" />
            <div className={styles.exitUser}>
              <h4>Vasil</h4>
              <h4>Chyhnar</h4>
            </div>
          </div>
          <div>
            <a className={styles.exitBtn}><ExitIcon /></a>
          </div>
        </div>
      </aside>
  
  );
};

export default LeftSidebar;