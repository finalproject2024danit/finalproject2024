import React from 'react';
import styles from './Card.module.scss'; 

const Card = ({ post, user, onDelete, onShowUserInfo }) => {
  return (
    <div className={styles.card} onClick={() => onShowUserInfo(user)}>
      <img src={post.imageUrl || "https://via.placeholder.com/150"} alt="Post image" />
      <div className={styles['cards-items']}>
        <p><strong className={styles['user-name']}>{user.name}</strong> ({user.email})</p>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <span className={styles['delete-btn']} onClick={(e) => { e.stopPropagation(); onDelete(post.id); }}>&times;</span>
      </div>
    </div>
  );
};

export default Card;