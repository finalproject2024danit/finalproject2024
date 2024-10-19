import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import MaskedInput from 'react-text-mask';  // Використовуємо react-text-mask
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const initialAvatar = localStorage.getItem('avatar') || 'default-avatar.png';
  const initialUserData = JSON.parse(localStorage.getItem('userData')) || {
    firstName: '',
    lastName: '',
    phoneNumber: '+38(___) ___-__-__', // Встановлюємо маску за замовчуванням
    email: '',
    gender: '',
    birthday: ''
  };

  const [avatar, setAvatar] = useState(initialAvatar);
  const [userData, setUserData] = useState(initialUserData);

  // Схема валідації
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string()
      .matches(/^\+38\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/, 'Phone number must be in the format +38(XXX) XXX-XX-XX')
      .required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    gender: Yup.string().oneOf(['male', 'female'], 'Select your gender').required('Gender is required'),
    birthday: Yup.date().required('Birthday is required')
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setAvatar(base64Image);
        localStorage.setItem('avatar', base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values) => {
    localStorage.setItem('userData', JSON.stringify(values));
    window.dispatchEvent(new Event('userDataUpdated'));
    setUserData(values);
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.avatarSection}>
        <img src={avatar} alt="User Avatar" className={styles.avatar} />
        <input type="file" onChange={handleAvatarChange} />

        <div className={styles.userInfo}>
          <h3>Profile Information</h3>
          <p><strong>First Name:</strong> {userData.firstName}</p>
          <p><strong>Last Name:</strong> {userData.lastName}</p>
          <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Gender:</strong> {userData.gender}</p>
          <p><strong>Birthday:</strong> {userData.birthday}</p>
        </div>
      </div>

      <Formik
        initialValues={userData}
        enableReinitialize={true}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className={styles.profileForm}>
            <div className={styles.formRow}>
              <label>First Name</label>
              <Field name="firstName" placeholder="Enter your first name" />
              {errors.firstName && touched.firstName ? <div>{errors.firstName}</div> : null}
            </div>

            <div className={styles.formRow}>
              <label>Last Name</label>
              <Field name="lastName" placeholder="Enter your last name" />
              {errors.lastName && touched.lastName ? <div>{errors.lastName}</div> : null}
            </div>

            <div className={styles.formRow}>
              <label>Phone Number</label>
              <Field name="phoneNumber">
                {({ field }) => (
                  <MaskedInput
                    {...field}
                    mask={['+', '3', '8', '(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                    placeholder="+38(XXX) XXX-XX-XX"
                    onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
                  />
                )}
              </Field>
              {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
            </div>

            <div className={styles.formRow}>
              <label>Email</label>
              <Field name="email" placeholder="Enter your email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </div>

            <div className={styles.formRow}>
              <label>Gender</label>
              <Field as="select" name="gender">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
              {errors.gender && touched.gender ? <div>{errors.gender}</div> : null}
            </div>

            <div className={styles.formRow}>
              <label>Birthday</label>
              <Field name="birthday">
                {({ field }) => (
                  <input
                    type="date"
                    {...field}
                    placeholder="dd-MM-yyyy"
                    onChange={(e) => setFieldValue('birthday', e.target.value)}
                  />
                )}
              </Field>
              {errors.birthday && touched.birthday ? <div>{errors.birthday}</div> : null}
            </div>

            <button type="submit">Update Profile</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfilePage;
