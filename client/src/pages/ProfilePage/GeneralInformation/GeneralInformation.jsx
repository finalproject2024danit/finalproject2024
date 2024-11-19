import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";
import styles from "./generalInformation.module.scss";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUserData } from "../../../redux/slices/userSlice.js";


// Gender Enum
const Gender = Object.freeze({
  MALE: "MALE",
  FEMALE: "FEMALE",
  NOT_SPECIFIED: "NOT_SPECIFIED",
});

// Validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().max(100, "Max 100 characters").required("Required"),
  lastName: Yup.string().max(100, "Max 100 characters").required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .max(100, "Max 100 characters")
    .required("Required"),
  phones: Yup.string()
    .matches(
      /^\+?[1-9]\d{1,14}$/,
      "Phone number must be in international format, e.g., +12345678901234"
    )
    .required("Phone is required"),
  gender: Yup.string()
    .oneOf(Object.values(Gender), "Invalid gender")
    .required("Required"),
  dateOfBirth: Yup.string().required("Required"),
});

// Date formatting helper
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toISOString().split('T')[0]; // Format as yyyy-MM-dd
};

// Convert date from string (DD.MM.YYYY) back to Unix timestamp
// const formatDateForInput = (dateStr) => {
//   const [day, month, year] = dateStr.split(".");
//   return `${day}-${month}-${year}`; 
// };

const convertToUnixTimestamp = (dateString) => {
  return new Date(dateString).getTime();
};


const GeneralInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      console.log("User data:", user); // Вивести об'єкт користувача в консоль
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName || "", // ініціалізуємо порожнім рядком, якщо значення немає
      lastName: user.lastName || "", // ініціалізуємо порожнім рядком, якщо значення немає
      email: user.email || "", // ініціалізуємо порожнім рядком, якщо значення немає
      gender: user.gender || "", // ініціалізуємо порожнім рядком, якщо значення немає
      dateOfBirth: user.dateOfBirth ? formatDate(user.dateOfBirth) : "", // Перевірка наявності дати народження
      phones: user.phones || "", // ініціалізуємо порожнім рядком, якщо значення немає
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const updatedValues = {
        ...values,
        dateOfBirth: values.dateOfBirth
          ? convertToUnixTimestamp(values.dateOfBirth)
          : null,
        avatar: user.avatar,
        password: values.password ? btoa(values.password) : undefined,
      };
      dispatch(updateUserData({ userId: user.id, userData: updatedValues }));
      setIsEditing(false);
    },
  });

  // Обновление значений формы при изменении данных пользователя
  useEffect(() => {
    // if (user.dateOfBirth) {
    //   formik.setFieldValue("dateOfBirth", formatDate(user.dateOfBirth));
    // }
    
    formik.setValues({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      gender: user.gender || "",
      phones: user.phones || "",
      password: "",
      dateOfBirth: formatDate(user.dateOfBirth) || "",      
    });
  }, [user]);
  

  return (
    <MainContent title="">
      <div className={styles.generalContainer}>
        <div className={styles.sidebar}>
          <div className={styles.avatarSection}>
            <img
              src={user.avatar || "default-avatar.png"}
              alt="User Avatar"
              className={styles.avatar}
            />
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
                value={formik.values.firstName} // забезпечуємо, що значення завжди є
                disabled={!isEditing}
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
                value={formik.values.lastName} // забезпечуємо, що значення завжди є
                disabled={!isEditing}
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
                value={formik.values.email} // забезпечуємо, що значення завжди є
                disabled={!isEditing}
              />
              {formik.touched.email && formik.errors.email && (
                <div className={styles.error}>{formik.errors.email}</div>
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
                value={formik.values.password} // забезпечуємо, що значення завжди є
                disabled={!isEditing}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={styles.error}>{formik.errors.password}</div>
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
                value={formik.values.gender} // забезпечуємо, що значення завжди є
                disabled={!isEditing}
              >
                <option value="">Select gender</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                <option value="NOT_SPECIFIED">NOT_SPECIFIED</option>
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
                value={formik.values.dateOfBirth} // забезпечуємо, що значення завжди є
                disabled={!isEditing}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <div className={styles.error}>{formik.errors.dateOfBirth}</div>
              )}
            </div>

            <div>
              <label htmlFor="phones" className={styles.label}>Phone</label>
              <input
                id="phones"
                name="phones"
                type="text"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phones} // забезпечуємо, що значення завжди є
                disabled={!isEditing}
              />
              {formik.touched.phones && formik.errors.phones && (
                <div className={styles.error}>{formik.errors.phones}</div>
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
