import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MainContent from "../../components/MainContent/MainContent";
import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  const [isLoginActive, setIsLoginActive] = useState(false);

  const handleLoginClick = () => {
    setIsLoginActive(true);
  };

  const handleSignupClick = () => {
    setIsLoginActive(false);
  };

  // Валідаційна схема для форми реєстрації
  const SignupSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password too short").required("Password is required"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
  });

  // Валідаційна схема для форми входу
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <MainContent title="">
      <div className={styles.loginBox}>
        <ul className={styles.circles}>
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={i}></li>
          ))}
        </ul>
        <div className={`${styles.wrapper} ${isLoginActive ? styles.active : ""}`}>
          <div className={`${styles.form} ${styles.signup}`}>
            <header onClick={handleSignupClick}>Signup</header>
            <Formik
              initialValues={{
                fullName: "",
                email: "",
                password: "",
                terms: false,
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                console.log("Signup values", values);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field type="text" name="fullName" placeholder="Full name" />
                  <ErrorMessage name="fullName" component="div" className={styles.error} />
                  
                  <Field type="text" name="email" placeholder="Email address" />
                  <ErrorMessage name="email" component="div" className={styles.error} />

                  <Field type="password" name="password" placeholder="Password" />
                  <ErrorMessage name="password" component="div" className={styles.error} />

                  <div className={styles.checkbox}>
                    <Field type="checkbox" name="terms" id="signupCheck" />
                    <label htmlFor="signupCheck">I accept all terms & conditions</label>
                  </div>
                  <ErrorMessage name="terms" component="div" className={styles.error} />

                  <button type="submit" disabled={isSubmitting}>
                    Signup
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          
          <div className={`${styles.form} ${styles.login}`}>
            <header onClick={handleLoginClick}>Login</header>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                console.log("Login values", values);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field type="text" name="email" placeholder="Email address" />
                  <ErrorMessage name="email" component="div" className={styles.error} />

                  <Field type="password" name="password" placeholder="Password" />
                  <ErrorMessage name="password" component="div" className={styles.error} />

                  <a href="#">Forgot password?</a>
                  <button type="submit" disabled={isSubmitting}>
                    Login
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </MainContent>
  );
};

export default LoginPage;

