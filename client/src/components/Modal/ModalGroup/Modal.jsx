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


export default Modal;
