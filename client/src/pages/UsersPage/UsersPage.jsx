import React, { useEffect, useState } from "react";
import styles from "./UsersPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";
import axiosInstance from "../../api/axiosInstance.js";
import { NavLink } from "react-router-dom";
import ButtonAddFriend from "../../components/ButtonAddFriend/index.jsx";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Состояние для поиска
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
          setUsers(usersData);
        } else {
          setError("Користувачі не знайдені.");
        }
      } catch (err) {
        console.error("Помилка під час завантаження даних:", err.message);
        setError(`Помилка під час завантаження даних: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Фильтруем пользователей на основе введённого текста
  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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

  const addFriend = async (userId) => {
    const userFromId = 1;

    if (typeof userFromId !== "number" || typeof userId !== "number") {
      console.error("Invalid user ID(s)");
      return;
    }

    try {
      const response = await axiosInstance.post(`/api/v1/friends/add`, {
        userFromId,
        userToId: userId,
      });

      console.log("Friend added successfully:", response.data);
    } catch (error) {
      console.error("Помилка при додаванні у друзі:", error.message);
    }
  };

  const defaultAvatar =
    "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1729669892/photo_2024-10-23_10-30-18_nmluce.jpg";

  return (
    <MainContent title="">
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Пошук друзів..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.userBox}>
        {loading ? (
          <p>Завантаження...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
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
                    src={user.avatar || defaultAvatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    onError={(e) => (e.target.src = defaultAvatar)}
                  />
                  <h2>
                    {user.firstName} {user.lastName}
                  </h2>
                </div>
              </div>
              <div className={styles.back}>
                <div className={styles.inner}>
                  <NavLink to={`/user/${user.id}`} className={styles.link}>
                    <h3 className={styles.infoUser}>Info user</h3>
                  </NavLink>
                  <ButtonAddFriend onClick={() => addFriend(user.id)} />
                  <h2 className={styles.clickToFlip}>Click to flip back</h2>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Користувачі не знайдені.</p>
        )}
      </div>
    </MainContent>
  );
};

export default UsersPage;




