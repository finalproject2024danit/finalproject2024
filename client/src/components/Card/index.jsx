// import React from 'react';
// import PropTypes from 'prop-types';
// import styles from './Card.module.scss'; 

// const Card = ({ post, user, onDelete, onShowUserInfo }) => {
//   return (
//     <div className={styles.card} onClick={() => onShowUserInfo(user)}>
//       <img src={post.imageUrl || "https://via.placeholder.com/150"} alt="Post image" />
//       <div className={styles['cards-items']}>
//         <p><strong className={styles['user-name']}>{user.name} ({user.email})</strong></p>
//         <h3>{post.title}</h3>
//         <p>{post.body}</p>
//         <span className={styles['delete-btn']} onClick={(e) => { e.stopPropagation(); onDelete(post.id); }}>&times;</span>
//       </div>
//     </div>
//   );
// };


// Card.propTypes = {
//   post: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     imageUrl: PropTypes.string,
//     title: PropTypes.string.isRequired,
//     body: PropTypes.string.isRequired,
//   }).isRequired,
//   user: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//   }).isRequired,
//   onDelete: PropTypes.func,
//   onShowUserInfo: PropTypes.func,
// };

// export default Card;