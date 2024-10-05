import React from 'react';
import styles from './RightSidebar.module.scss'

const RightSidebar = () => {
  return (
    <div className={styles.rightSidebar}>
      <h3>Sponsored</h3>
      <p>Ad content here</p>
      <h3>Contacts</h3>
      <ul>
        <li>Friend 1</li>
        <li>Friend 2</li>
        <li>Friend 3</li>
      </ul>
    </div>
  );
};

export default RightSidebar;