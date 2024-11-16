import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Імпортуємо useSelector
import axiosInstance from "../../api/axiosInstance.js";
import styles from "./UserPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";
import { fetchHobbiesByUserId } from "../../redux/slices/hobbiesSlice.js";
import { fetchResidencesByUserId } from "../../redux/slices/residencesSlice.js";

const UserPage = () => {
  const { id } = useParams(); // Отримуємо ID користувача з URL
  const dispatch = useDispatch(); // Для відправки дій в Redux
  const hobbies = useSelector((state) => state.hobbies[id]); // Отримуємо хобі користувача з Redux store
  const residences = useSelector((state) => state.residences[id]); // Отримуємо місце проживання з Redux store
  const [user, setUser] = useState(null); // Стан для користувача
  const [loading, setLoading] = useState(true); // Стан для завантаження
  const [error, setError] = useState(null); // Стан для помилок

  useEffect(() => {
    // Функція для завантаження даних користувача
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/user/${id}`);
        setUser(response.data); // Зберігаємо дані користувача
      } catch (err) {
        setError(`Помилка завантаження користувача: ${err.message}`);
      } finally {
        setLoading(false); // Завершуємо завантаження
      }
    };

    fetchUser();
    dispatch(fetchHobbiesByUserId(id)); // Відправляємо запит на отримання хобі користувача
    dispatch(fetchResidencesByUserId(id)); // Відправляємо запит на отримання місця проживання
  }, [id, dispatch]);

  // Форматування дати
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Форматуємо дату згідно з локаллю
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>; // Якщо є помилка, відображаємо повідомлення про помилку
  }

  // Форматування номерів телефонів
  const formatPhones = (phones) => {
    return phones || "No phones"; // Якщо немає телефонів, виводимо повідомлення
  };
  

  return (
    <MainContent title="">
      <div className={styles.userBox}>
      
        <img
          className={styles.userPhoto}
          src={user.avatar || "default_avatar_url"} // Замінимо на URL за замовчуванням для аватара
          alt={`${user.firstName} ${user.lastName}`}
        />
        <div title={`${user.firstName} ${user.lastName}`}>
          <div className={styles.userDetails}>
            <h2>{`${user.firstName} ${user.lastName}`}</h2>
            <p>Date of birth: {formatDate(user.dateOfBirth)}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {formatPhones(user.phones)}</p>
            <p>Gender: {user.gender}</p>
            <p>Created Date: {formatDate(user.createdDate)}</p>

            {/* Рендер місця проживання користувача */}
            <div className={styles.residencesList}>
              <h3>Place of residence:</h3>
              {residences ? (
                <p>{`Planet: ${residences.planet}, Country: ${residences.country}, City: ${residences.city}`}</p>
              ) : (
                <p>Place of residence not found</p>
              )}
            </div>

            {/* Рендер хобі користувача */}
            <div className={styles.hobbiesList}>
              <h3>Hobby:</h3>
              {hobbies && hobbies.length > 0 ? (
                <ul>
                  {hobbies.map((hobby) => (
                    <li key={hobby.id}>
                      {`Language: ${hobby.language}, Pet: ${hobby.pet}, Interest: ${hobby.interest}`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Hobbies not found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  );
};

export default UserPage;
