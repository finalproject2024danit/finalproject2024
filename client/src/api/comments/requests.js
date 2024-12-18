import axiosInstance from '../axiosInstance.js'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCommentsByPostId = async ({ postId, startPage = 0, perPage = 10, sortBy = "id", sortDirection = "asc" }) => {
  try {
    const response = await axiosInstance.get(`/comments/comment/post/${postId}`, {
      params: {
        startPage,
        perPage, 
        sortBy,   
        sortDirection, 
      },
    });
    console.log(response);
    return response.data;
     } catch (error) {
    console.error("Error fetching comments:", error);
    throw error.response?.data || new Error("Failed to fetch comments");
  }
};


/// Створення нового коментаря
export const createComment = async ({ postId, userId, content }) => {
  try {
    console.log("Creating comment:", { postId, userId, content });
    // Відправка запиту на сервер
    const response = await axiosInstance.post(`/comments/comment/create`, {
      postId,
      userId,
      content,
    });
    const comment = response.data;
    // Повертаємо створений коментар
    return comment;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error.response?.data || 'Unknown error';
  }
};

// Видалення коментаря за ID
export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async ({ postId, commentId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(`/comments/comment/delete/${commentId}`);

      // Видаляємо коментар з Redux
      dispatch(deleteComment({ postId, commentId }));

      // Оновлюємо localStorage
      const storedComments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
      const updatedComments = storedComments.filter(comment => comment.id !== commentId);
      localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));

      return response.data.message; // Повертаємо повідомлення про успішне видалення
    } catch (error) {
      console.error('Error deleting comment:', error);
      return rejectWithValue(error.response?.data || 'Unknown error');
    }
  }
);
