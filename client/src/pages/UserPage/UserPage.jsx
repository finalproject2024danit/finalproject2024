import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance.js";
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
        console.log(response.data); // Логування для перевірки
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
    return phones || "Немає телефонів"; // Якщо телефони не вказані
  };

  return (
    <MainContent title="">
    <div className={styles.userBox}>
      <img
        className={styles.userPhoto}
        src={user.avatar || "default_avatar_url"} // Змінити на URL за замовчуванням
        alt={`${user.firstName} ${user.lastName}`}
      />
      {/* <div className={styles.mainContent}> */}
        <div title={`${user.firstName} ${user.lastName}`}>
          <div className={styles.userDetails}>
            <h2>{`${user.firstName} ${user.lastName}`}</h2> {/* Відображення імені */}
            <p>Date of birth: {formatDate(user.dateOfBirth)}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {formatPhones(user.phones)}</p>
            <p>Gender: {user.gender}</p>
            <p>Created Date: {formatDate(user.createdDate)}</p>
          </div>
        </div>
      {/* </div> */}
    </div>
    </MainContent>
  );  
};


export default UserPage;



