import axios from 'axios';

const axiosInstance = axios.create({

  baseURL: 'http://134.209.246.21:9000/api/v1',
  // baseURL: 'http://localhost:9000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Обробка помилок у відповідях
// axiosInstance.interceptors.response.use(
//   (response) => response, // Якщо відповідь успішна
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.error("Unauthorized! Redirecting to login...");
//       localStorage.removeItem("authToken"); // Очищення токена
//       window.location.href = "/login"; // Перенаправлення на сторінку логіну
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
