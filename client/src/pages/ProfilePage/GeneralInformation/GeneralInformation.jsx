import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";
import styles from "./generalInformation.module.scss";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUserData } from "../../../redux/slices/userSlice.js";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phones: Yup.string().matches(/^\d+$/, "Only numbers allowed").optional(),
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
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            dateOfBirth: '',
            phones: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const updatedValues = {
                ...values,
                dateOfBirth: values.dateOfBirth ? new Date(values.dateOfBirth).getTime() : null,
            };
            dispatch(updateUserData({ userId: user.id, userData: updatedValues }));
            setIsEditing(false);
        },
    });

    useEffect(() => {
        if (user) {
            formik.setValues({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                gender: user.gender || '',
                dateOfBirth: user.dateOfBirth !== null ? formatDate(user.dateOfBirth) : '',
                phones: user.phones || '',
            });
        }
    }, [user]);

    return (
        <MainContent title="">
            <div className={styles.container}>
                <ProfileMenu />
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
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
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
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
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
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
                        <label htmlFor="gender">Gender</label>
                        <input
                            id="gender"
                            name="gender"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.gender}
                            disabled={!isEditing}
                        />
                    </div>

                    <div>
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.dateOfBirth}
                            disabled={!isEditing}
                        />
                    </div>

                    <div>
                        <label htmlFor="phones">Phones</label>
                        <input
                            id="phones"
                            name="phones"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phones}
                            disabled={!isEditing}
                        />
                        {formik.touched.phones && formik.errors.phones && (
                            <div className={styles.error}>{formik.errors.phones}</div>
                        )}
                    </div>

                    <button type="button" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                    {isEditing && <button type="submit">Save</button>}
                </form>
            </div>
        </MainContent>
    );
};

export default GeneralInformation;
