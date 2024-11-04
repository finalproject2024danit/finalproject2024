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

  // Установим начальные значения для языков, питомца и интересов
  const [languages, setLanguages] = useState(user.languages || []);
  const [pet, setPet] = useState(user.pet || "");
  const [interests, setInterests] = useState(user.interests || []);

  const handleAddLanguage = () => {
    setLanguages([...languages, ""]);
  };

  const handleRemoveLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const handleLanguageChange = (index, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = value;
    setLanguages(updatedLanguages);
  };

  const handleAddInterest = () => {
    setInterests([...interests, ""]);
  };

  const handleRemoveInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const handleInterestChange = (index, value) => {
    const updatedInterests = [...interests];
    updatedInterests[index] = value;
    setInterests(updatedInterests);
  };

  const handleSave = () => {
    dispatch(
      updateUserData({
        userId: user.id,
        userData: { languages, pet, interests },
      })
    );
    setIsEditing(false);
  };

  return (
    <MainContent title="">
      <div className={styles.container}>
        <ProfileMenu />
        <div className={styles.content}>
          <h2 className={styles.title}>Hobbies</h2>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>Languages</h3>
            <div className={styles.hobbyList}>
              {languages.map((language, index) => (
                <div key={index} className={styles.hobbyItem}>
                  {isEditing ? (
                    <input
                      type="text"
                      className={styles.hobbyInput}
                      value={language}
                      onChange={(e) => handleLanguageChange(index, e.target.value)}
                    />
                  ) : (
                    <p className={styles.hobbyText}>{language}</p>
                  )}
                  {isEditing && (
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => handleRemoveLanguage(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  type="button"
                  className={styles.addButton}
                  onClick={handleAddLanguage}
                >
                  Add Language
                </button>
              )}
            </div>
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
            <h3 className={styles.subtitle}>Interests</h3>
            <div className={styles.hobbyList}>
              {interests.map((interest, index) => (
                <div key={index} className={styles.hobbyItem}>
                  {isEditing ? (
                    <input
                      type="text"
                      className={styles.hobbyInput}
                      value={interest}
                      onChange={(e) => handleInterestChange(index, e.target.value)}
                    />
                  ) : (
                    <p className={styles.hobbyText}>{interest}</p>
                  )}
                  {isEditing && (
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => handleRemoveInterest(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  type="button"
                  className={styles.addButton}
                  onClick={handleAddInterest}
                >
                  Add Interest
                </button>
              )}
            </div>
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
