import React from "react";
import styles from './GroupPage.module.scss';
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import MainContent from "../../components/MainContent/MainContent";

const GroupPage = () => {
    const groupContent = (
        <div>
          <h2>Welcome to the Group</h2>
          <p>This is where group discussions and posts will appear.</p>
          <ul>
            <li>Group Post 1</li>
            <li>Group Post 2</li>
            <li>Group Post 3</li>
          </ul>
        </div>
      );

    return(
        <div className={styles.layout}>
        <LeftSidebar />
        <div className={styles.mainContent}>
        <MainContent title="Group" content={groupContent} />
        </div>
      </div>

    //     <div className={styles.group__box}>
    //         <LeftSidebar/>
    // <h1>Group</h1>
    // </div>    
    )
}

export default GroupPage;