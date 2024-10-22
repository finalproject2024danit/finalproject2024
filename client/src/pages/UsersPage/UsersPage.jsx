import React, { useEffect, useState } from "react"; 
import styles from './UsersPage.module.scss';
import MainContent from '../../components/MainContent/MainContent';
import axiosInstance from './axiosConfig'; // Імпортуємо налаштований axios

const UsersContent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Кількість користувачів на сторінку
  const sortBy = "firstName"; // Зміна на firstName для сортування
  const sortDirection = "asc"; // 'asc' або 'desc' - напрямок сортування

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/', { // Використовуємо базовий URL
          params: {
            startPage: currentPage,
            perPage: usersPerPage,
            sortBy,
            sortDirection
          }
        });
        
        const usersData = response.data;
        if (Array.isArray(usersData) && usersData.length > 0) {
          setUsers(prevUsers => [...prevUsers, ...usersData]); // Додавання нових користувачів до вже існуючих
        } else {
          throw new Error('Дані користувачів не відповідають очікуваній структурі або порожні');
        }
      } catch (err) {
        setError(`Помилка під час завантаження даних: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        setCurrentPage(prev => prev + 1); // Збільшуємо сторінку при прокручуванні
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading && users.length === 0) {
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
          </div>
        ))
      ) : (
        <p>Користувачі не знайдені.</p>
      )}
      {loading && <p>Завантаження ще...</p>}
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

