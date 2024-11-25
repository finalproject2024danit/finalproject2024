import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ProfileMenu from "../ProfileMenu.jsx";
import styles from "./generalInformation.module.scss";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import EditButtons from "../../../components/ButtonEdit/index.jsx";
import {useFormik} from "formik";
import * as Yup from "yup";
import {updateUserData} from "../../../redux/slices/userSlice.js";
import {Gender} from "../../../utils/gender.js";
import {unixToDate} from "../../../utils/unixToDate.js";
import {dateToUnix} from "../../../utils/dateToUnix.js";

const GeneralInformation = () => {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

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

    const formik = useFormik({
        initialValues: {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            gender: user.gender || "",
            dateOfBirth: user.dateOfBirth ? unixToDate(user.dateOfBirth) : "",
            phones: user.phones || "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            const updatedValues = {
                ...values,
                dateOfBirth: values.dateOfBirth
                    ? dateToUnix(values.dateOfBirth)
                    : null,
                avatar: user.avatar,
                password: values.password ? btoa(values.password) : undefined,
            };

            await dispatch(
                updateUserData({userId: user.id, userData: updatedValues})
            );

            setIsEditing(false);
        },
    });

    useEffect(() => {
        formik.setValues({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            gender: user.gender || "",
            phones: user.phones || "",
            password: "",
            dateOfBirth: "",
        });
    }, [user]);

    return (
        <MainContent title="">
            <div className={styles.container}>
            <ProfileMenu className={styles.profileMenu}/>
                
                <div className={styles.content}>
                <div className={styles.sidebar}>
                    <div className={styles.avatarSection}>
                        <img
                            src={user.avatar || "default-avatar.png"}
                            alt="User Avatar"
                            className={styles.avatar}
                        />                        
                    </div>
                </div>
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
                                disabled={!isEditing}
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
                                disabled={!isEditing}
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
                                disabled={!isEditing}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className={styles.error}>{formik.errors.email}</div>
                            )}
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
                                disabled={!isEditing}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className={styles.error}>{formik.errors.password}</div>
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
                                disabled={!isEditing}
                            />
                            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                                <div className={styles.error}>{formik.errors.dateOfBirth}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phones" className={styles.label}>
                                Phone
                            </label>
                            <input
                                id="phones"
                                name="phones"
                                type="text"
                                className={styles.input}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phones}
                                disabled={!isEditing}
                            />
                            {formik.touched.phones && formik.errors.phones && (
                                <div className={styles.error}>{formik.errors.phones}</div>
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

export default GeneralInformation;
