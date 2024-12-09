import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: {}, // Структура: { [groupId]: { [postId]: [comments] } }
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // Встановлення коментарів для певного посту
    setComments: (state, action) => {
      const { groupId, postId, comments } = action.payload;

      // Створюємо структуру для groupId та postId, якщо вона ще не існує
      state.comments[groupId] = {
        ...state.comments[groupId],
        [postId]: comments,
      };
    },

    // Додавання коментаря до посту
    addComment: (state, action) => {
      const { groupId, postId, comment } = action.payload;

      if (!comment || typeof comment !== 'object') {
        console.error('Invalid comment:', comment);
        return; // Не додаємо, якщо коментар некоректний
      }

      // Переконайтесь, що існують потрібні рівні структури
      state.comments[groupId] = state.comments[groupId] || {};
      state.comments[groupId][postId] = state.comments[groupId][postId] || [];

      // Додаємо коментар до масиву
      state.comments[groupId][postId].push(comment);
    },
  },
});

export const { setComments, addComment } = commentsSlice.actions;

export default commentsSlice.reducer;
