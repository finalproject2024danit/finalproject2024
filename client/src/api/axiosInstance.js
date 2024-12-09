import axios from 'axios';


// Створення axios інстансу
const axiosInstance = axios.create({
  baseURL: 'http://134.209.246.21:9000/api/v1',  // Основний URL для запитів
  // baseURL: 'http://localhost:9000/api/v1',
  headers: {
    'Content-Type': 'application/json', // Стандартний тип контенту
  },
});

// Інтерцептор для запитів
axiosInstance.interceptors.request.use(
  (config) => {
    // Отримуємо токен з localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // Додаємо токен до заголовків запиту
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Якщо помилка в запиті, її потрібно обробити
  }
);

// Функція для логіну та отримання токена
export const loginByEmail = async (loginPayload) => {
  try {
    const response = await axios.post('http://134.209.246.21:9000/auth/login', loginPayload);
    const { accessToken } = response.data; // Отримуємо токен з відповіді
    localStorage.setItem('authToken', accessToken); // Зберігаємо токен в localStorage
    return accessToken;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};

export default axiosInstance;



