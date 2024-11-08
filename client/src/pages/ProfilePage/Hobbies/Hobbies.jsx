import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import styles from "./Hobbies.module.scss";
import { updateUserData } from "../../../redux/slices/userSlice.js";

const Hobbies = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  // Initialize state with hobby data from user slice
  const [language, setLanguage] = useState(user.hobby.language || "");
  const [pet, setPet] = useState(user.hobby.pet || "");
  const [interest, setInterest] = useState(user.hobby.interest || "");

  const handleSave = () => {
    const updatedHobby = { 
      hobby: { 
        language, 
        pet, 
        interest 
      }
    };
    dispatch(updateUserData({ userId: user.id, userData: updatedHobby }));
    setIsEditing(false);
  };

  return (
    <MainContent title="">
      <div className={styles.container}>
        <ProfileMenu />
        <div className={styles.content}>
          <h2 className={styles.title}>Hobbies</h2>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>Language</h3>
            {isEditing ? (
              <input
                type="text"
                className={styles.hobbyInput}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            ) : (
              <p className={styles.hobbyText}>{language}</p>
            )}
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>Pet</h3>
            {isEditing ? (
              <input
                type="text"
                className={styles.hobbyInput}
                value={pet}
                onChange={(e) => setPet(e.target.value)}
              />
            ) : (
              <p className={styles.hobbyText}>{pet}</p>
            )}
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>Interest</h3>
            {isEditing ? (
              <input
                type="text"
                className={styles.hobbyInput}
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              />
            ) : (
              <p className={styles.hobbyText}>{interest}</p>
            )}
          </div>

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
