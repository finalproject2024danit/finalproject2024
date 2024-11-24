// EditButtons.jsx
import styles from "./ButtonEdit.module.scss";

const EditButtons = ({isEditing, onEditClick, onSaveClick}) => {
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

export default EditButtons;
