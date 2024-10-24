import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../UsersPage/axiosConfig";
import styles from "./UserPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/user/${id}`);
        setUser(response.data);
      } catch (err) {
        setError(`Помилка завантаження користувача: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Формат дати залежно від локалі
  };

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const formatPhones = (phones) => {
    if (Array.isArray(phones)) {
      return phones.join(", ");
    } else if (typeof phones === "string") {
      return phones; // Якщо телефон - рядок, повертаємо його
    } else {
      return "Немає телефонів"; // Якщо не масив і не рядок
    }
  };

  return (
    <div className={styles.layout}>
      <img
        className={styles.userPhoto}
        src={user.avatar || "default_avatar_url"}
        alt={`${user.firstName} ${user.lastName}`}
      />
      <div className={styles.mainContent}>
        <MainContent title={`${user.firstName} ${user.lastName}`}>
          <div className={styles.userDetails}>
            <p>Email: {user.email}</p>
            <p>Date of birth: {formatDate(user.dateOfBirth)}</p>
            <p>Phone: {formatPhones(user.phones)}</p>
            {/* Інша інформація про користувача */}
          </div>
        </MainContent>
      </div>
    </div>
  );
  
};

export default UserPage;


