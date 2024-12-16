import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../api/axiosInstance.js";


const initialState = {
  comments: {}, // Структура: { [groupId]: { [postId]: [comments] } }
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async ({ groupId, postId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/comments/comment/${groupId}`);
      console.log("наш:", response);
      return { groupId, postId, comments: response.data };
    } catch (error) {
      console.error('Error fetching comments:', error);
      return rejectWithValue(error.response?.data || 'Unknown error');
    }
  }
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ groupId, postId, userId, content }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(`/comments/comment/create`, {
        postId,
        userId,
        content,
      });
      const comment = response.data;

      // Додаємо коментар у Redux
      dispatch(addComment({ groupId, postId, comment }));

      // Оновлюємо коментарі в localStorage
      const storedComments = JSON.parse(localStorage.getItem(`comments_${groupId}_${postId}`)) || [];
      storedComments.push(comment);
      localStorage.setItem(`comments_${groupId}_${postId}`, JSON.stringify(storedComments));

      return comment;
    } catch (error) {
      console.error('Error creating comment:', error);
      return rejectWithValue(error.response?.data || 'Unknown error');
    }
  }
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async ({ groupId, postId, commentId }, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.get(`/comments/comment/delete/${commentId}`);

      // Видаляємо коментар з Redux
      dispatch(deleteComment({ groupId, postId, commentId }));

      // Оновлюємо localStorage
      const storedComments = JSON.parse(localStorage.getItem(`comments_${groupId}_${postId}`)) || [];
      const updatedComments = storedComments.filter(comment => comment.id !== commentId);
      localStorage.setItem(`comments_${groupId}_${postId}`, JSON.stringify(updatedComments));

      return commentId;
    } catch (error) {
      console.error('Error deleting comment:', error);
      return rejectWithValue(error.response?.data || 'Unknown error');
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      const { groupId, postId, comments } = action.payload;
      state.comments[groupId] = {
        ...state.comments[groupId],
        [postId]: comments,
      };

      localStorage.setItem(`comments_${groupId}_${postId}`, JSON.stringify(comments));
    },
    addComment: (state, action) => {
      const { groupId, postId, comment } = action.payload;

      if (!comment || typeof comment !== 'object') {
        console.error('Invalid comment:', comment);
        return;
      }

      state.comments[groupId] = state.comments[groupId] || {};
      state.comments[groupId][postId] = state.comments[groupId][postId] || [];

      state.comments[groupId][postId].push(comment);

      localStorage.setItem(
        `comments_${groupId}_${postId}`,
        JSON.stringify(state.comments[groupId][postId])
      );
    },
    deleteComment: (state, action) => {
      const { groupId, postId, commentId } = action.payload;

      const commentsForPost = state.comments[groupId]?.[postId];
      if (!commentsForPost) {
        console.error(`No comments found for groupId: ${groupId}, postId: ${postId}`);
        return;
      }

      state.comments[groupId][postId] = commentsForPost.filter(comment => comment.id !== commentId);

      localStorage.setItem(
        `comments_${groupId}_${postId}`,
        JSON.stringify(state.comments[groupId][postId])
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { groupId, postId, comments } = action.payload;
        state.comments[groupId] = {
          ...state.comments[groupId],
          [postId]: comments,
        };
      })
      .addCase(fetchComments.rejected, (state, action) => {
        console.error('Failed to fetch comments:', action.payload);
      });
  },
});

export const { setComments, addComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;