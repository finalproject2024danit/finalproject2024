// import React from 'react';
import { NavLink } from "react-router-dom";
import styles from './LeftSidebar.module.scss'


const LeftSidebar = () => {
  return (
   

    <aside className={styles.menu}>
        <div>
        <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to="/profile"            >
              <div className={styles.iconWrapper}>
              <img src={"https://via.placeholder.com/30"} alt="Post image" />
              </div>
            </NavLink>
        </div>
        <div>
          <form action="">
            <input type="text" />
            <button>Search</button>
          </form>
        </div>
        <div className={styles.exit}>
          <div className={styles.exitBlock}>
            <img src={"https://via.placeholder.com/30"} alt="Post image" />
            <div className={styles.exitUser}>
              <h4>Vasil Chyhnar</h4>
              <p>Online</p>
            </div>
          </div>
          <div>
            <img src={"https://via.placeholder.com/30"} alt="Post image" />
          </div>
        </div>
      </aside>
  
  );
};

export default LeftSidebar;