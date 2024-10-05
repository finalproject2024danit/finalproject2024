import React from 'react';
import styles from './MainContent.module.scss'

const MainContent = ({title, content}) => {
  return (
    <div className={styles.mainFeed}>
      <h1>{title}</h1>
      {content && content.length > 0 ? (
        content.map((item, index) => (
          <div key={index} className={styles.post}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
};

export default MainContent;
