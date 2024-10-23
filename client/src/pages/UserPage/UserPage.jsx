// import React, { useEffect } from "react";
import styles from "./UserPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";

const UserPage = () => { 

  const userContent = (
    <h2>USER!!!</h2>
  );


  return (
    <div className={styles.layout}>
      <div className={styles.mainContent}>
        <MainContent title="">
          {userContent}
        </MainContent>
      </div>
    </div>
  );
};

export default UserPage;


