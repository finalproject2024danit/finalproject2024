import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  fetchRegister,
  fetchToken,
  fetchUserDataByToken,
} from "../../redux/slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  const token = useSelector((state) => state.user.token);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserDataByToken(token));
      navigate("/");
    }
  }, [token, navigate, dispatch]);

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
        login: values.email,
        password: values.password,
      };

      const result = await dispatch(fetchToken(loginPayload));

      if (result.payload) {
        await dispatch(fetchUserDataByToken(result.payload));
      } else {
        setErrorMessage("Failed to retrieve token. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to login.");
    }
  };

  const handleRegister = async (values) => {
    try {
      const hashedPassword = bcrypt.hashSync(values.password, 10);
      const registerPayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: hashedPassword,
      };

      dispatch(fetchRegister(registerPayload));

      if (token) {
        navigate("/");
      } else {
        setErrorMessage("Failed to retrieve token. Please try again.");
      }
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

        <div className={`${styles.form} ${styles.signUp}`}>
          <header className={styles.logHeader} onClick={handleRegisterClick}>
            Signup
          </header>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={RegistrationSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="text" name="firstName" placeholder="First name" />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className={styles.error}
                />
                <Field type="text" name="lastName" placeholder="Last name" />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className={styles.error}
                />
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

export default LoginPage;
