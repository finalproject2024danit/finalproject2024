import axiosInstance from '../axiosInstance.js'

// Отримання коментаря за ID
export const getCommentById = async (commentId) => {
  try {
    const response = await axiosInstance.get(`/api/v1/comment/${commentId}`);
    console.log('Comment fetched:', response.data); // Лог отриманого коментаря
    return response.data; // Повертаємо отримані дані
  } catch (error) {
    console.error('Error fetching comment:', error); // Лог помилки
    throw error; // Викидаємо помилку для подальшої обробки
  }
};

// Створення нового коментаря
export const createComment = async (postId, userId, content) => {
  try {
    const response = await axiosInstance.post('/api/v1/comment/create', {
      postId,
      userId,
      content
    });
    console.log('Comment created:', response.data); // Лог створеного коментаря
    return response.data; // Повертаємо створений коментар
  } catch (error) {
    console.error('Error creating comment:', error); // Лог помилки
    throw error; // Викидаємо помилку для подальшої обробки
  }
};

// Видалення коментаря за ID
export const deleteComment = async (commentId) => {
  try {
    const response = await axiosInstance.get(`/api/v1/comment/delete/${commentId}`);  // Змінили на GET
    console.log('Comment deleted:', response.data.message); // Лог повідомлення про успішне видалення
    return response.data; // Повертаємо відповідь сервера
  } catch (error) {
    console.error('Error deleting comment:', error); // Лог помилки
    throw error; // Викидаємо помилку для подальшої обробки
  }
};


