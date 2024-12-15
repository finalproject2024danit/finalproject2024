import { fetchComments, addComment, deleteComment } from "../redux/slices/commentsSlice";
import axiosInstance from '../api/axiosInstance';

// Отримання коментарів для поста
export const handleFetchComments = async (groupId, postId, dispatch) => {
  try {
    await dispatch(fetchComments({ groupId, postId }));  // Викликаємо action для отримання коментарів
    console.log(`Comments fetched for post ${postId} in group ${groupId}`);
  } catch (error) {
    console.error('Error fetching comments:', error.message);
  }
};

// Створення коментарів для поста
export const handleSubmitComment = async (postId, groupId, commentValues, userFromId, dispatch, setCommentValues) => {
  const commentText = commentValues[postId];
  if (!commentText) return;

  const newComment = {
    postId,
    userId: userFromId.id,
    content: commentText,
  };

  try {
    const response = await axiosInstance.post('/comments/comment/create', newComment);
    console.log('Comment created:', response.data);

    dispatch(addComment({
      groupId,
      postId,
      comment: response.data,
    }));

    const updatedComments = JSON.parse(localStorage.getItem("comments")) || {};
    updatedComments[groupId] = updatedComments[groupId] || {};
    updatedComments[groupId][postId] = updatedComments[groupId][postId] || [];
    updatedComments[groupId][postId].push(response.data);
    localStorage.setItem("comments", JSON.stringify(updatedComments));

    setCommentValues((prevValues) => ({ ...prevValues, [postId]: "" }));
  } catch (error) {
    console.error('Error creating comment:', error.response?.data || error.message);
  }
};


export const handleDeleteComment = async (commentToDelete, dispatch, handleCloseDeleteCommentModal) => {
  if (!commentToDelete) return;

  const { commentId, postId, groupId } = commentToDelete;

  try {
    // Используем метод GET с правильным URL
    const response = await axiosInstance.get(`/comments/comment/delete/${commentId}`);
    console.log(response.data.message);

    dispatch(deleteComment({ commentId, postId, groupId }));

    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    if (storedComments[groupId] && storedComments[groupId][postId]) {
      storedComments[groupId][postId] = storedComments[groupId][postId].filter(
        (comment) => comment.id !== commentId
      );
      localStorage.setItem("comments", JSON.stringify(storedComments));
    }

    handleCloseDeleteCommentModal();
  } catch (error) {
    console.error("Failed to delete comment:", error.response?.data || error.message);
  }
};



