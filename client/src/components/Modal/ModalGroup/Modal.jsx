import styles from "./Modal.module.scss";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, onSubmit, newPost, setNewPost }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create New Post</h2>
        <input
          type="text"
          placeholder="Enter title"
          value={newPost.title}
          onChange={(e) => setNewPost((prev) => ({ ...prev, title: e.target.value }))}
        />
        <textarea
          placeholder="Enter content"
          value={newPost.content}
          onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
        />
        <div className={styles.modalActions}>
          <button className={styles.createButton} onClick={onSubmit}>Create</button>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Вказує, чи відкрита модалка
  onClose: PropTypes.func.isRequired, // Функція закриття модалки
  onSubmit: PropTypes.func.isRequired, // Функція для обробки сабміту
  newPost: PropTypes.shape({
    title: PropTypes.string.isRequired, // Назва поста
    content: PropTypes.string.isRequired, // Контент поста
  }).isRequired, // Об'єкт із даними нового поста
  setNewPost: PropTypes.func.isRequired, // Функція для оновлення стану поста
}

export default Modal;
