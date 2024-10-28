// import PropTypes from 'prop-types';
// import styles from './Modal.module.scss'; // Импорт модульных стилей

// const Modal = ({ user, onClose }) => {
//   console.log(user);
//   if (!user) return null;

//   return (
//     <div className={styles.modal} onClick={onClose}>
//       <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
//         <span className={styles['close-btn']} onClick={onClose}>&times;</span>
//         <div id="user-info">
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>Username:</strong> {user.username}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Phone:</strong> {user.phone}</p>
//           <p><strong>Website:</strong> {user.website}</p>
//           <p><strong>Company:</strong> {user.company.name}</p>
//           <p><strong>Address:</strong> {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// Modal.propTypes = {
//   user: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     username: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     phone: PropTypes.string.isRequired,
//     website: PropTypes.string.isRequired,
//     company: PropTypes.shape({
//       name: PropTypes.string.isRequired,
//     }).isRequired,
//     address: PropTypes.shape({
//       street: PropTypes.string.isRequired,
//       suite: PropTypes.string,
//       city: PropTypes.string.isRequired,
//       zipcode: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired, // 'user' is required
//   onClose: PropTypes.func.isRequired, // 'onClose' is required
// };

// export default Modal;
