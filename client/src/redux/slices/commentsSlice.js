import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCommentsByPostId,
  createComment,
  removeComment,
} from "../../api/comments/requests";

const initialState = {
  comments: [], // Структура: { [postId]: [comments] }
  loading: false,
  error: null,
};

// Отримання коментарів для поста
export const fetchComments = createAsyncThunk(
  "comments/fetchByPostId",
  async ({ postId, ...params }, { rejectWithValue }) => {
    try {
      // Вызываем существующую функцию API с передачей postId и остальных параметров
      return await fetchCommentsByPostId({ postId, ...params });
    } catch (error) {
      console.error("Error fetching comments:", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch comments"
      );
    }
  }
);

// Створення нового коментаря
export const fetchNewComment = createAsyncThunk(
  "comment/createComment",
  async ({ postId, userId, content }, { rejectWithValue }) => {
    try {
      return await createComment({ postId, userId, content });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Видалення коментаря
export const removeCommentThunk = createAsyncThunk(
  "comments/removeComment",
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      await removeComment({ commentId });
      return { postId, commentId };
    } catch (error) {
      console.error("Error deleting comment:", error);
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      const { postId, comments } = action.payload;
      state.comments[postId] = comments;
      localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
    },
  },
  extraReducers: (builder) => {
    builder
      // Отримання коментарів
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId } = action.meta.arg;
        state.comments[postId] = action.payload;
        state.loading = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = false;
      })

      // Створення коментаря
      // Створення коментаря
    .addCase(fetchNewComment.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchNewComment.fulfilled, (state, action) => {
      const { postId } = action.meta.arg;
      const newComment = action.payload;

      state.comments[postId] = state.comments[postId] || [];
      state.comments[postId].push(newComment);

      localStorage.setItem(
        `comments_${postId}`,
        JSON.stringify(state.comments[postId])
      );

      state.loading = false;
    })
    .addCase(fetchNewComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
      // .addCase(fetchNewComment.fulfilled, (state, action) => {
      //   const { postId, comment } = action.payload;
      //   state.comments[postId] = state.comments[postId] || [];
      //   state.comments[postId].push(comment);
      //   localStorage.setItem(`comments_${postId}`, JSON.stringify(state.comments[postId]));
      // })

      // Видалення коментаря
      .addCase(removeCommentThunk.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;
        state.comments[postId] =
          state.comments[postId]?.filter(
            (comment) => comment.id !== commentId
          ) || [];
        // localStorage.setItem(`comments_${postId}`, JSON.stringify(state.comments[postId]));
      });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
