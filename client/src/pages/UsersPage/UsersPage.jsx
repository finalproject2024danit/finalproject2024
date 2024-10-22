import React, { useEffect, useState } from "react";
import styles from './UsersPage.module.scss';
import MainContent from '../../components/MainContent/MainContent';
import axiosInstance from './axiosConfig'; // Імпортуємо налаштований axios

const UsersContent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usersPerPage = 10; // Кількість користувачів на сторінку
  const sortBy = "firstName"; // Зміна на firstName для сортування
  const sortDirection = "asc"; // 'asc' або 'desc' - напрямок сортування
  const currentPage = 0;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Виконуємо запит до сервера
        const response = await axiosInstance.get('/users/filter', {
          params: {
            startPage: currentPage,
            perPage: usersPerPage,
            sortBy,
            sortDirection
          }
        });

        const usersData = response.data || []; // Припускаю, що відповідь містить поле "content" для даних користувачів

        if (usersData.length > 0) {
          setUsers(prevUsers => [...prevUsers, ...usersData]); // Додавання нових користувачів до вже існуючих
        } else {
          setError('Користувачі не знайдені.');
        }
      } catch (err) {
        setError(`Помилка під час завантаження даних: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Запит лише при завантаженні компонента

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Список користувачів:</h1>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id}>
            <h2>{user.firstName} {user.lastName}</h2> {/* Відображення ім'я та прізвище */}
            <p>Email: {user.email}</p>
            <p>Вік: {new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()}</p> {/* Розрахунок віку */}
            <img src={user.avatar} alt={`${user.firstName}'s avatar`} />
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
          <UsersContent /> {/* Виклик компонента */}
        </MainContent>
      </div>
    </div>
  );
};

export default UsersPage;

