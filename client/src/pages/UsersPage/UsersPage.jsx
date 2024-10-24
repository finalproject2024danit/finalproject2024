import React, { useEffect, useState } from "react";
import styles from "./UsersPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";
import axiosInstance from "./axiosConfig";
import { NavLink } from "react-router-dom"; // Імпорт NavLink, якщо ви його використовуєте

const UsersContent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const usersPerPage = 10;
  const sortBy = "firstName";
  const sortDirection = "asc";
  const currentPage = 0;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users/filter", {
          params: {
            startPage: currentPage,
            perPage: usersPerPage,
            sortBy,
            sortDirection,
          },
        });

        const usersData = response.data || [];

        if (usersData.length > 0) {
          setUsers((prevUsers) => [...prevUsers, ...usersData]);
        } else {
          setError("Користувачі не знайдені.");
        }
      } catch (err) {
        setError(`Помилка під час завантаження даних: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCardClick = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    setTimeout(() => {
      setFlippedCards((prev) => ({
        ...prev,
        [id]: false,
      }));
    }, 5000);
  };

  const defaultAvatar =
    "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1729669892/photo_2024-10-23_10-30-18_nmluce.jpg";

  return (
    <div className={styles.userBox}>
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user.id}
            className={`${styles.userCard} ${
              flippedCards[user.id] ? styles.flipped : ""
            }`}
            onClick={() => handleCardClick(user.id)}
          >
            <div className={styles.front}>
              <div className={styles.inner}>
                <img
                  className={styles.userPhoto}
                  src={user.avatar ? user.avatar : defaultAvatar}
                  alt={`${user.firstName} ${user.lastName}'s avatar`}
                  onError={(e) => {
                    // Якщо фото не може завантажитися, показуємо резервне фото
                    e.target.src = defaultAvatar;
                  }}
                />
                <h2>
                  {user.firstName} {user.lastName}
                </h2>
              </div>
            </div>

            <div className={styles.back}>
              <div className={styles.inner}>
                
                <NavLink to={`/user/${user.id}`}>
                  <h3>Info user</h3>
                </NavLink>

                <h2>Click to flip back</h2>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Користувачі не знайдені.</p>
      )}
    </div>
  );
};

const UsersPage = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.mainContent}>
        <MainContent title="">
          <UsersContent />
        </MainContent>
      </div>
    </div>
  );
};

export default UsersPage;
