import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axiosInstance"; // Використовуємо axiosInstance
import { fetchUserDataByToken } from "../../redux/slices/userSlice.js";
import styles from "./LoginPage.module.scss";
import axios from "axios";


const LoginPage = ({ onLoginSuccess }) => {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    setIsLoginActive(true);
    setErrorMessage("");
  };

  const handleRegisterClick = () => {
    setIsLoginActive(false);
    setRegistrationMessage("");
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const RegistrationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password too short")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
  });

  const handleLogin = async (values) => {
    try {
      const loginPayload = {
        login: values.email, // Передаємо "email" як "login"
        password: values.password,
      };

      // Надсилаємо запит на логін
      const loginResponse = await axios.post(
        "http://134.209.246.21:9000/auth/login",
        loginPayload
      );

      // Логування для перевірки відповіді
      console.log("Login Response:", loginResponse);

      const token = loginResponse.data.accessToken; // Перевірте правильність поля, де зберігається токен
      console.log("Access Token:", token); // Для перевірки, чи отримуємо правильний токен

      if (token) {
        localStorage.setItem("authToken", token);
        dispatch(fetchUserDataByToken(token));
        onLoginSuccess();
      } else {
        setErrorMessage("Failed to retrieve token. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to login.");
    }

    //   if (token) {
    //     // Логування перед записом в localStorage
    //     console.log("Saving token to localStorage:", token);

    //     // Записуємо токен в localStorage
    //     localStorage.setItem("authToken", token);
    //     // dispatch

    //     // Перевірка, чи записався токен в localStorage
    //     console.log(
    //       "Token from localStorage:",
    //       localStorage.getItem("authToken")
    //     );

    //     const userData = fetchUserDataByToken.data;

    //     // Зберігаємо дані користувача в Redux
    //     dispatch(fetchUserDataByToken(token));

    //     // Логування даних користувача
    //     console.log("User data:", userData);

    //     // Збереження даних користувача в LocalStorage
    //     localStorage.setItem("userData", JSON.stringify(userData));

    //     // Перехід до головної сторінки або інша дія після успішного логіну
    //     onLoginSuccess();
    //   } else {
    //     setErrorMessage("Token not found in response!");
    //   }
    // } catch (error) {
    //   setErrorMessage(
    //     error.response?.data?.message || "Failed to login. Try again."
    //   );
    // }
  };

  const handleRegister = async (values, { resetForm }) => {
    try {
      await axiosInstance.post("/auth/register", {
        email: values.email,
        password: values.password,
      });
      setRegistrationMessage("Registration successful! You can now log in.");
      resetForm();
    } catch (error) {
      setRegistrationMessage(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className={styles.loginBox}>
      <ul className={styles.circles}>
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>
      <div
        className={`${styles.wrapper} ${isLoginActive ? styles.active : ""}`}
      >
        {/* Форма входу */}
        <div className={`${styles.form} ${styles.login}`}>
          <header className={styles.logHeader} onClick={handleLoginClick}>
            Login
          </header>
          <Formik
            initialValues={{
              email: "alice.johnson@example.com",
              password: "password123",
            }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="text" name="email" placeholder="Email address" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />

                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />

                {errorMessage && (
                  <div className={styles.error}>{errorMessage}</div>
                )}

                <button
                  className={styles.loginBtn}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Форма реєстрації */}
        <div className={`${styles.form} ${styles.signUp}`}>
          <header className={styles.logHeader} onClick={handleRegisterClick}>
            Signup
          </header>
          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={RegistrationSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="text" name="email" placeholder="Email address" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />

                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />

                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={styles.error}
                />

                {registrationMessage && (
                  <div className={styles.message}>{registrationMessage}</div>
                )}

                <button
                  className={styles.signUpBtn}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Signup
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};


export default LoginPage;
