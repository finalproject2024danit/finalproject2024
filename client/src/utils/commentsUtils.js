import { addComment, deleteComment } from "../redux/slices/commentsSlice";

export const handleCommentChange = (postId, event, setCommentValues) => {
  setCommentValues((prevValues) => ({
    ...prevValues,
    [postId]: event.target.value,
  }));
};

export const handleSubmitComment = (postId, groupId, commentValues, userFromId, dispatch, setCommentValues) => {
  if (!dispatch || typeof dispatch !== "function") {
    console.error("Dispatch is not a function");
    return;
  }
  const commentText = commentValues[postId];
  if (!commentText) {    
    return;
  }

  const newComment = {
    id: Date.now(),
    content: commentText,
    userName: userFromId?.firstName || "Unknown",
    userLastName: userFromId?.lastName || "",
    userAvatar: userFromId?.avatar || "",
    createdDate: new Date().toISOString(),
  };
  // Додаємо коментар у Redux
  dispatch(
    addComment({
      groupId,
      postId,
      comment: newComment,
    })
  );

  // Оновлюємо коментарі в localStorage
  const updatedComments = JSON.parse(localStorage.getItem("comments")) || {};
  if (!updatedComments[groupId]) updatedComments[groupId] = {};
  if (!updatedComments[groupId][postId]) updatedComments[groupId][postId] = [];
  updatedComments[groupId][postId].push(newComment);
  localStorage.setItem("comments", JSON.stringify(updatedComments));

  // Очищаємо поле вводу коментаря після додавання
  setCommentValues((prevValues) => ({
    ...prevValues,
    [postId]: "",
  }));
};

export const handleDeleteComment = async (commentToDelete, dispatch, handleCloseDeleteCommentModal) => {
  if (commentToDelete) {
    const { commentId, postId, groupId } = commentToDelete;

    try {
      // Видаляємо коментар через сервер
      await dispatch(deleteComment({ commentId, postId, groupId }));

      // Оновлюємо коментарі в локальному сховищі
      const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
      if (storedComments[groupId] && storedComments[groupId][postId]) {
        const updatedComments = storedComments[groupId][postId].filter((comment) => comment.id !== commentId);
        storedComments[groupId][postId] = updatedComments;
        localStorage.setItem("comments", JSON.stringify(storedComments));
      }

      // Закриваємо модальне вікно після успішного видалення
      handleCloseDeleteCommentModal();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  }
};
