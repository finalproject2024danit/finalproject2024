import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import styles from './LeftSidebar.module.scss';
import ExitIcon from "../../svg/Header/Exit";
import PenIcon from "../../svg/Header/Pen";

const LeftSidebar = () => {
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || 'default-avatar.png');
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || {
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setAvatar(localStorage.getItem('avatar') || 'default-avatar.png');
      setUserData(JSON.parse(localStorage.getItem('userData')) || { firstName: '', lastName: '' });
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userDataUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userDataUpdated', handleStorageChange);
    };
  }, []);

  return (
    <aside className={`${styles.leftMenu} ${styles.shinyCta}`}>
      <div>
        <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/profile/general_information">
          <div className={styles.iconWrapper}>
            <img src={avatar} alt="User Avatar" />
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
      <div className={styles.exit}>
        <div className={styles.exitBlock}>
          <img className={styles.exitBlockImg} src={avatar} alt="User Avatar" />
          <div className={styles.exitUser}>
            <h4>{userData.firstName}</h4>
            <h4>{userData.lastName}</h4>
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
