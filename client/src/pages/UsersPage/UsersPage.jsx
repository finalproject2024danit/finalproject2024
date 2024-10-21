import React, { useEffect, useState } from "react"; 
import styles from './UsersPage.module.scss';
import MainContent from '../../components/MainContent/MainContent';
import axios from "axios";

const UsersContent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Кількість користувачів на запит

  useEffect(() => {
    const fetchUsers = async () => {
      const userIds = await getUserIds(); // Отримання ID користувачів
      const requests = userIds.slice(0, currentPage * usersPerPage).map(id => 
        axios.get(`http://134.209.246.21:9000/api/v1/users/user/${id}`)
      );

      try {
        const responses = await Promise.all(requests);
        const usersData = responses.map(response => response.data);
        setUsers(prevUsers => [...prevUsers, ...usersData]);
      } catch (err) {
        setError(`Помилка під час завантаження даних: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const getUserIds = async () => {
    // Тут ви можете реалізувати логіку для отримання ID користувачів
    return Array.from({ length: 50 }, (_, i) => i + 1); // Приклад статичного масиву з 50 ID
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        setCurrentPage(prev => prev + 1);
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
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Вік: {user.age}</p>
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


// import React, { useEffect, useState } from "react"; 
// import styles from './UsersPage.module.scss';
// import MainContent from '../../components/MainContent/MainContent';
// import axios from "axios";

// const UsersContent = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const userIds = [1, 2, 3];
//       const requests = userIds.map(id => 
//         axios.get(`http://134.209.246.21:9000/api/v1/users/user/${id}`)
//       );

//       try {
//         const responses = await Promise.all(requests);
//         const usersData = responses.map(response => response.data);
//         setUsers(usersData);
//       } catch (err) {
//         setError(`Помилка під час завантаження даних: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) {
//     return <p>Завантаження...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1>Список користувачів:</h1>
//       {users.length > 0 ? (
//         users.map((user) => (
//           <div key={user.id}>
//             <h2>{user.name}</h2>
//             <p>Email: {user.email}</p>
//             <p>Вік: {user.age}</p>
//           </div>
//         ))
//       ) : (
//         <p>Користувачі не знайдені.</p>
//       )}
//     </div>
//   );
// };

// const UsersPage = () => {
//   return (
//     <div className={styles.layout}>   
//       <div className={styles.mainContent}>
//         <MainContent title="">
//           <UsersContent /> {/* Виклик компонента */}
//         </MainContent>
//       </div>
//     </div>
//   );
// };

// export default UsersPage;


