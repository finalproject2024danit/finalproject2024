// EditButtons.jsx
import React from "react";
import styles from "./ButtonEdit.module.scss";
import PropTypes from "prop-types";

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

export default EditButtons;
