import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar.jsx";
import RightSidebar from "../../components/RightSidebar/RightSidebar.jsx";
import MainContent from "../../components/MainContent/MainContent.jsx";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const posts = [
    { title: 'Post 1', body: 'This is the first post content.' },
    { title: 'Post 2', body: 'This is the second post content.' },
  ];

  return (
    <div className={styles.layout}>
      <LeftSidebar />
      <div className={styles.mainContent}>
        <MainContent title="News Feed" content={posts} />
      </div>
      <RightSidebar />
    </div>
  );
};

export default HomePage;
