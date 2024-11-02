import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";
import styles from "./generalInformation.module.scss";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUserData } from "../../../redux/slices/userSlice.js";
import axios from "axios";

// Enum для Gender
const Gender = Object.freeze({
  MALE: "MALE",
  FEMALE: "FEMALE",
  NOT_SPECIFIED: "NOT_SPECIFIED",
});

// Обновленная схема валидации
const validationSchema = Yup.object().shape({
  firstName: Yup.string().max(100, "Max 100 characters").required("Required"),
  lastName: Yup.string().max(100, "Max 100 characters").required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .max(100, "Max 100 characters")
    .required("Required"),
  phones: Yup.string()
    .matches(
      /^\+?[1-9]\d{1,14}$/, // Общее регулярное выражение для международных номеров
      "Phone number must be in international format, e.g., +12345678901234"
    )
    .required("Phone is required"),
  gender: Yup.string()
    .oneOf(Object.values(Gender), "Invalid gender")
    .required("Required"),
  dateOfBirth: Yup.string().required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{5,20}$/,
      "Password must be 5-20 characters and include at least one uppercase and lowercase letter"
    )
    .optional(),
});

// Функция для форматирования даты
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const GeneralInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      gender: user.gender || "",
      dateOfBirth: user.dateOfBirth ? formatDate(user.dateOfBirth) : "",
      phones: user.phones || "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const updatedValues = {
        ...values,
        dateOfBirth: values.dateOfBirth ? new Date(values.dateOfBirth).getTime() : null,
        avatar,
        password: values.password ? btoa(values.password) : undefined,
      };
      dispatch(updateUserData({ userId: user.id, userData: updatedValues }));
      setIsEditing(false);
    },
  });

  useEffect(() => {
    if (user && user.id) {
      (async () => {
        try {
          const response = await axios.get(`/api/v1/user_all_info/${user.id}`);
          const userData = response.data;
  
          // Установка полученных данных в formik
          formik.setValues({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            gender: userData.gender || "",
            dateOfBirth: userData.dateOfBirth ? formatDate(userData.dateOfBirth) : "",
            phones: Array.isArray(userData.phones) ? userData.phones.join(", ") : userData.phones || "",
            password: "",
          });
          setAvatar(userData.avatar || null);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      })(); // Immediately Invoked Function Expression (IIFE)
    }
  }, [user, formik]);

  return (
    <MainContent title="">
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.avatarSection}>
            <img
              src={avatar || "default-avatar.png"}
              alt="User Avatar"
              className={styles.avatar}
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className={styles.avatarInput}
              />
            )}
          </div>
          <div className={styles.userInfo}>
            <p><strong>First Name:</strong> {formik.values.firstName}</p>
            <p><strong>Last Name:</strong> {formik.values.lastName}</p>
            <p><strong>Email:</strong> {formik.values.email}</p>
            <p><strong>Gender:</strong> {formik.values.gender}</p>
            <p><strong>Date of Birth:</strong> {formik.values.dateOfBirth}</p>
            <p><strong>Phones:</strong> {formik.values.phones}</p>
          </div>
        </div>
        <div className={styles.content}>
          <ProfileMenu className={styles.profileMenu} />
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div>
              <label htmlFor="firstName" className={styles.label}>First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className={styles.error}>{formik.errors.firstName}</div>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className={styles.label}>Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className={styles.error}>{formik.errors.lastName}</div>
              )}
            </div>

            <div>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className={styles.error}>{formik.errors.email}</div>
              )}
            </div>

            <div>
              <label htmlFor="gender" className={styles.label}>Gender</label>
              <select
                id="gender"
                name="gender"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
              >
                <option value={Gender.MALE} label="MALE" />
                <option value={Gender.FEMALE} label="FEMALE" />
                <option value={Gender.NOT_SPECIFIED} label="NOT SPECIFIED" />
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className={styles.error}>{formik.errors.gender}</div>
              )}
            </div>

            <div>
              <label htmlFor="dateOfBirth" className={styles.label}>Date of Birth</label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfBirth}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <div className={styles.error}>{formik.errors.dateOfBirth}</div>
              )}
            </div>

            <div>
              <label htmlFor="phones" className={styles.label}>Phones</label>
              <input
                id="phones"
                name="phones"
                type="text"
                className={styles.input}
                placeholder="+12345678901234" // Общий образец международного номера
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phones}
              />
              {formik.touched.phones && formik.errors.phones && (
                <div className={styles.error}>{formik.errors.phones}</div>
              )}
            </div>

            <div>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={styles.error}>{formik.errors.password}</div>
              )}
            </div>

            <button type="button" className={styles.button} onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button type="submit" className={styles.button}>Save</button>
            )}
          </form>
        </div>
      </div>
    </MainContent>
  );
};

export default GeneralInformation;
