import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginSuccess } from "../../redux/slices/authSlice.js";
import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.isLoggedIn) {
      navigate("/");
    }
  }, [authState.isLoggedIn, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple authentication logic
    if (email === "user@example.com" && password === "password") {
      dispatch(loginSuccess({ email }));
      navigate("/");
    } else {
      dispatch(loginFailure("Invalid credentials"));
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Facebook Login</h1>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
        {authState.error && <p className={styles.error}>{authState.error}</p>}
      </form>
      <div className={styles.createAccount}>Create New Account</div>
    </div>
  );
};

export default LoginPage;
