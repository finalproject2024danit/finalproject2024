import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: {}, 
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      const { groupId, postId, comments } = action.payload;
      if (!state.comments[groupId]) {
        state.comments[groupId] = {};
      }
      state.comments[groupId][postId] = comments;
    },
    addComment: (state, action) => {
      const { groupId, postId, comment } = action.payload;
      if (!state.comments[groupId]) {
        state.comments[groupId] = {};
      }
      if (!state.comments[groupId][postId]) {
        state.comments[groupId][postId] = [];
      }
      state.comments[groupId][postId].push(comment);
    },
  },
});

export const { setComments, addComment } = commentsSlice.actions;

export default commentsSlice.reducer;
