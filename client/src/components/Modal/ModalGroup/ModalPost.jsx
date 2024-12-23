import styles from "./ModalPost.module.scss";
import PropTypes from "prop-types";

const ModalPost = ({ isOpen, onClose, onSubmit, newPost, setNewPost }) => {
  if (!isOpen) return null;

  const isEditing = !!newPost.id;

  const handleClose = () => {
    setNewPost({ content: "" });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{isEditing ? "Edit Post" : "Create New Post"}</h2>
        <textarea
          placeholder="Enter content"
          value={newPost.content}
          onChange={(e) =>
            setNewPost((prev) => ({ ...prev, content: e.target.value }))
          }
        />
        <div className={styles.modalActions}>
          <button className={styles.createButton} onClick={onSubmit}>
            {isEditing ? "Save Changes" : "Create"}
          </button>
          <button className={styles.cancelButton} onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

ModalPost.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  newPost: PropTypes.object.isRequired,
  setNewPost: PropTypes.func.isRequired,
};

export default ModalPost;
