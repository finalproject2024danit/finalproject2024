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


export const createComment = async ({ postId, userId, content }) => {
  try {
    console.log("Creating comment:", { postId, userId, content });   
    const response = await axiosInstance.post(`/comments/comment/create`, {
      postId,
      userId,
      content,
    });
    const comment = response.data;    
    return comment;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error.response?.data || 'Unknown error';
  }
};

// Видалення коментаря за ID

export const deleteComment = async ({ commentId }) => {
  console.log("Attempting to delete comment with ID:", commentId);
  if (!commentId) {
    throw new Error("Missing commentId for delete request");
  }
  try {
    const response = await axiosInstance.get(`/comments/comment/delete/${commentId}`);
    return response.data; // Сервер повертає { "message": "Comment was successfully deleted" }
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error.response?.data || new Error("Failed to delete comment");
  }
};


// export const removeComment = async ({ postId, commentId }) => {
//   try {
//     const response = await axiosInstance.get(`/comments/comment/delete/${commentId}`);

//     // Оновлюємо localStorage
//     const storedComments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
//     const updatedComments = storedComments.filter((comment) => comment.id !== commentId);
//     localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));

//     console.log('Comment deleted successfully:', response.data.message);
//     return response.data.message; // Повертаємо повідомлення про успішне видалення
//   } catch (error) {
//     console.error('Error deleting comment:', error);
//     throw error.response?.data || new Error('Unknown error');
//   }
// };
