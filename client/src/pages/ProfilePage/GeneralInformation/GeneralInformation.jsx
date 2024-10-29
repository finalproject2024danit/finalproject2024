import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";
import styles from "./generalInformation.module.scss";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUserData } from "../../../redux/slices/userSlice.js";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().max(100, "Max 100 characters").required("Required"),
  lastName: Yup.string().max(100, "Max 100 characters").required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .max(100, "Max 100 characters")
    .required("Required"),
  phones: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone format")
    .required("Primary phone number is required"),
  gender: Yup.string()
    .oneOf(["MALE", "FEMALE", "NOT_SPECIFIED"], "Invalid gender")
    .required("Required"),
  dateOfBirth: Yup.number()
    .required("Required")
    .min(0, "Must be a valid timestamp"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
});

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB", {
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
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      dateOfBirth: "",
      phones: "",
      secondaryPhone: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const updatedValues = {
        ...values,
        dateOfBirth: values.dateOfBirth
          ? new Date(values.dateOfBirth).getTime()
          : null,
        avatar,
      };
      dispatch(updateUserData({ userId: user.id, userData: updatedValues }));
      setIsEditing(false);
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        gender: user.gender || "",
        dateOfBirth:
          user.dateOfBirth !== null ? formatDate(user.dateOfBirth) : "",
        phones: user.phones || "",
        secondaryPhone: user.secondaryPhone || "",
        password: "",
      });
      setAvatar(user.avatar || null);
    }
  }, [user]);

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
            <p>
              <strong>First Name:</strong> {formik.values.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {formik.values.lastName}
            </p>
            <p>
              <strong>Email:</strong> {formik.values.email}
            </p>
            <p>
              <strong>Gender:</strong> {formik.values.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong> {formik.values.dateOfBirth}
            </p>
            <p>
              <strong>Phones:</strong> {formik.values.phones}
            </p>
            <p>
              <strong>Secondary Phone:</strong> {formik.values.secondaryPhone}
            </p>
          </div>
        </div>
        <div className={styles.content}>
          <ProfileMenu className={styles.profileMenu} />
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div>
              <label htmlFor="firstName" className={styles.label}>
                First Name
              </label>
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
              <label htmlFor="lastName" className={styles.label}>
                Last Name
              </label>
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
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
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
              <label htmlFor="gender" className={styles.label}>
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
              >
                <option value="" label="Select gender" />
                <option value="MALE" label="Male" />
                <option value="FEMALE" label="Female" />
                <option value="NOT_SPECIFIED" label="Not Specified" />
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className={styles.error}>{formik.errors.gender}</div>
              )}
            </div>

            <div>
              <label htmlFor="dateOfBirth" className={styles.label}>
                Date of Birth
              </label>
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
              <label htmlFor="phones" className={styles.label}>
                Primary Phone
              </label>
              <input
                id="phones"
                name="phones"
                type="text"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phones}
              />
              {formik.touched.phones && formik.errors.phones && (
                <div className={styles.error}>{formik.errors.phones}</div>
              )}
            </div>

            <div>
              <label htmlFor="secondaryPhone" className={styles.label}>
                Secondary Phone
              </label>
              <input
                id="secondaryPhone"
                name="secondaryPhone"
                type="text"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.secondaryPhone}
              />
            </div>

            <div>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
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

            <button
              type="button"
              className={styles.button}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button type="submit" className={styles.button}>
                Save
              </button>
            )}
          </form>
        </div>
      </div>
    </MainContent>
  );
};

export default GeneralInformation;
