import React from 'react';
import styles from './LeftSidebar.module.scss'


const LeftSidebar = () => {
  return (
    <div className={styles.leftSidebar}>
      <ul>
        <li>Home</li>
        <li>Friends</li>
        <li>Groups</li>
        <li>Marketplace</li>
        {/* Add more sidebar items here */}
      </ul>
    </div>
  );
};

export default LeftSidebar;