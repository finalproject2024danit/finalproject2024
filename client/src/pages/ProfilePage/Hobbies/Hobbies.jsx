import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import styles from "./hobbies.module.scss";
import { updateUserData } from "../../../redux/slices/userSlice.js";

const Hobbies = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [hobbyList, setHobbyList] = useState(
    user.hobbies || ["Reading", "Traveling", "Gaming"]
  );

  const handleAddHobby = () => {
    setHobbyList([...hobbyList, ""]);
  };

  const handleRemoveHobby = (index) => {
    setHobbyList(hobbyList.filter((_, i) => i !== index));
  };

  const handleHobbyChange = (index, value) => {
    const updatedHobbies = [...hobbyList];
    updatedHobbies[index] = value;
    setHobbyList(updatedHobbies);
  };

  const handleSave = () => {
    dispatch(
      updateUserData({ userId: user.id, userData: { hobbies: hobbyList } })
    );
    setIsEditing(false);
  };

  return (
    <MainContent title="">
      <div className={styles.container}>
        <ProfileMenu /> {/* Sidebar with navigation */}
        <div className={styles.content}>
          <h2 className={styles.title}>Hobbies</h2>
          <div className={styles.hobbyList}>
            {hobbyList.map((hobby, index) => (
              <div key={index} className={styles.hobbyItem}>
                {isEditing ? (
                  <input
                    type="text"
                    className={styles.hobbyInput}
                    value={hobby}
                    onChange={(e) => handleHobbyChange(index, e.target.value)}
                  />
                ) : (
                  <p className={styles.hobbyText}>{hobby}</p>
                )}
                {isEditing && (
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemoveHobby(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddHobby}
            >
              Add Hobby
            </button>
          )}
          <button
            type="button"
            className={styles.editButton}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </MainContent>
  );
};

export default Hobbies;
