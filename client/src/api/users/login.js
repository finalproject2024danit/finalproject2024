import axiosInstance from './path-to-axios-instance'; // коректний шлях до axiosInstance

// Логін і збереження токену
const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    const token = response.data.token; // Припускаємо, що токен міститься в відповіді
    if (token) {
      localStorage.setItem('access_token', token); // Зберігаємо токен в localStorage
      console.log('Login successful, token:', token);
    } else {
      console.error('No token received in response');
    }
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
  }
};

// Отримання користувача через токен
const getUserByToken = async () => {
  const token = localStorage.getItem('access_token'); // Отримуємо токен з localStorage
  if (!token) {
    console.error('No token found!');
    return;
  }

  try {
    const response = await axiosInstance.post(
      '/auth/get_user', // Це має бути POST-запит, який декодує токен
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('User data:', response.data); // Логування даних користувача
  } catch (error) {
    console.error('Failed to get user by token:', error.response?.data || error.message);
  }
};

// Отримання користувача за ID
const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/user/${id}`);
    console.log('User by ID:', response.data); // Логування даних користувача за ID
  } catch (error) {
    console.error('Failed to get user by ID:', error.response?.data || error.message);
  }
};

// Отримання всіх даних користувача за ID
const getUserAllInfoById = async (id) => {
  try {
    const response = await axiosInstance.get(`/user_all_info/${id}`);
    console.log('All user information:', response.data); // Логування всіх даних користувача
  } catch (error) {
    console.error('Failed to get all user info:', error.response?.data || error.message);
  }
};

// Реєстрація перехоплювача для обробки помилок з токеном (наприклад, якщо токен прострочений)
axiosInstance.interceptors.response.use(
  (response) => response, // Якщо запит успішний, просто повертаємо відповідь
  (error) => {
    if (error.response?.status === 401) {
      console.log('Token is invalid or expired. Please log in again.');
      // Можна виконати перенаправлення на сторінку входу
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Експортуємо функції для подальшого використання
export { login, getUserByToken, getUserById, getUserAllInfoById };
