import PropTypes from "prop-types";
import styles from "./ButtonEdit.module.scss";

const EditButtons = ({ isEditing, onEditClick, onSaveClick }) => {
  return (
    <div className={styles.buttonContainer}>
      <button type="button" className={styles.button} onClick={onEditClick}>
        {isEditing ? "Cancel" : "Edit"}
      </button>
      {isEditing && (
        <button type="submit" className={styles.button} onClick={onSaveClick}>
          Save
        </button>
      )}
    </div>
  );
};

EditButtons.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
};

export default EditButtons;
