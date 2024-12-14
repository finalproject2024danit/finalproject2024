import { useState } from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProfileMenu from "../ProfileMenu.jsx";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import EditButtons from "../../../components/ButtonEdit/index.jsx";
import styles from "./Hobbies.module.scss";
import {
  fetchHobbiesByUserId,
  updateHobbies,
  loadHobbiesFromLocalStorage 
} from "../../../redux/slices/hobbiesSlice.js";

const Hobbies = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const hobbies = useSelector((state) => state.hobbies[user.id]);
  useEffect(() => {
    // Спочатку перевіряємо localStorage на наявність хобі
    if (!hobbies) {
      dispatch(loadHobbiesFromLocalStorage(user.id)); // Завантажити хобі з localStorage
    }
    if (!hobbies) {
      dispatch(fetchHobbiesByUserId(user.id)); // Якщо не знайдено в localStorage, завантажити з сервера
    }
  }, [dispatch, user.id, hobbies]);

  const validationSchema = Yup.object({
    language: Yup.string().max(100, "Max 100 characters"),
    pet: Yup.string().max(100, "Max 100 characters"),
    interest: Yup.string().max(100, "Max 100 characters"),
  });

  const formik = useFormik({
    initialValues: {
      language: user.hobby.language || "",
      pet: user.hobby.pet || "",
      interest: user.hobby.interest || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const updatedHobby = { ...values };
      try {
        const response = await dispatch(
          updateHobbies({ userId: user.id, updatedHobby })
        );
        if (response.meta.requestStatus === "fulfilled") {
          console.log("Hobby updated successfully on the server");
          await dispatch(fetchHobbiesByUserId(user.id));
          setIsEditing(false);
        } else {
          console.error(
            "Failed to update hobby on the server:",
            response.error
          );
        }
      } catch (error) {
        console.error("Error while saving hobby:", error);
      }
    },
  });

  return (
    <MainContent title="">
      <div className={styles.hobbiesBox}>
        <ProfileMenu />
        <div className={styles.content}>
          <h2 className={styles.title}>Hobbies</h2>

          <form onSubmit={formik.handleSubmit}>
            <div className={styles.section}>
              <h3 className={styles.subtitle}>Language</h3>
              {isEditing ? (
                <input
                  type="text"
                  className={styles.hobbyInput}
                  value={formik.values.language}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="language"
                />
              ) : (
                <p className={styles.hobbyText}>{formik.values.language}</p>
              )}
              {formik.touched.language && formik.errors.language && (
                <div className={styles.error}>{formik.errors.language}</div>
              )}
            </div>

            <div className={styles.section}>
              <h3 className={styles.subtitle}>Pet</h3>
              {isEditing ? (
                <input
                  type="text"
                  className={styles.hobbyInput}
                  value={formik.values.pet}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="pet"
                />
              ) : (
                <p className={styles.hobbyText}>{formik.values.pet}</p>
              )}
              {formik.touched.pet && formik.errors.pet && (
                <div className={styles.error}>{formik.errors.pet}</div>
              )}
            </div>

            <div className={styles.section}>
              <h3 className={styles.subtitle}>Interest</h3>
              {isEditing ? (
                <input
                  type="text"
                  className={styles.hobbyInput}
                  value={formik.values.interest}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="interest"
                />
              ) : (
                <p className={styles.hobbyText}>{formik.values.interest}</p>
              )}
              {formik.touched.interest && formik.errors.interest && (
                <div className={styles.error}>{formik.errors.interest}</div>
              )}
            </div>

            <EditButtons
              isEditing={isEditing}
              onEditClick={() => setIsEditing(!isEditing)}
              onSaveClick={formik.handleSubmit}
            />
          </form>
        </div>
      </div>
    </MainContent>
  );
};

export default Hobbies;
