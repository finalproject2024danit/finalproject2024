import {
  fetchComments,
  fetchNewComment,
  removeCommentThunk,
} from "../redux/slices/commentsSlice"; // Правильний імпорт
import axiosInstance from "../api/axiosInstance";

// Отримання коментарів для поста
// export const handleFetchComments = async (groupId, postId, dispatch) => {
//   try {
//     await dispatch(fetchComments({ postId }));  // Викликаємо action для отримання коментарів
//     console.log(`Comments fetched for post ${postId} in group ${groupId}`);
//   } catch (error) {
//     console.error('Error fetching comments:', error.message);
//   }
// };

// Створення коментарів для поста
export const handleSubmitComment = async (
  postId,
  groupId,
  commentValues,
  userFromId,
  dispatch,
  setCommentValues
) => {
  const commentText = commentValues[postId];
  if (!commentText) return;

  const newComment = {
    postId,
    userId: userFromId.id,
    content: commentText,
  };

  // Викликаємо thunk action для створення коментаря
  await dispatch(
    fetchNewComment({ postId, userId: userFromId.id, content: commentText })
  );
};

// Видалення коментаря
export const handleDeleteComment = async (
  commentToDelete,
  dispatch,
  handleCloseDeleteCommentModal
) => {
  if (!commentToDelete) return;

  const { commentId, postId, groupId } = commentToDelete;

  try {
    // Використовуємо метод DELETE, якщо сервер підтримує
    const response = await axiosInstance.delete(
      `/comments/comment/delete/${commentId}`
    );
    console.log(response.data.message);

    dispatch(removeCommentThunk({ postId, commentId }));

    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    if (storedComments[groupId] && storedComments[groupId][postId]) {
      storedComments[groupId][postId] = storedComments[groupId][postId].filter(
        (comment) => comment.id !== commentId
      );
      localStorage.setItem("comments", JSON.stringify(storedComments));
    }

    handleCloseDeleteCommentModal();
  } catch (error) {
    console.error(
      "Failed to delete comment:",
      error.response?.data || error.message
    );
  }
};
