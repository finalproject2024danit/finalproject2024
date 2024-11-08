import React from "react";
import { useSelector } from "react-redux";
import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import styles from "./photoLibrary.module.scss";

const PhotoLibrary = () => {
  const user = useSelector((state) => state.user);

  return (
    <MainContent title="">
      <div className={styles.container}>
        <ProfileMenu />
        <div className={styles.photoLibrary}>
          <h2>Your Photo</h2>
          <div className={styles.photosGrid}>
            {user.photoData ? (
              <img src={user.photoData} alt="User Photo" className={styles.photo} />
            ) : (
              <p>No photo available.</p>
            )}
          </div>
        </div>
      </div>
    </MainContent>
  );
};

export default PhotoLibrary;
