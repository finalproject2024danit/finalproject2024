import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCommentsByPostId,
  createComment,
  deleteComment,
} from "../../api/comments/requests";

const initialState = {
  comments: {},
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchByPostId",
  async ({ postId, ...params }, { rejectWithValue }) => {
    try {
      return await fetchCommentsByPostId({ postId, ...params });
    } catch (error) {
      console.error("Error fetching comments:", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch comments"
      );
    }
  }
);

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

export const removeComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ postId, commentId }, { rejectWithValue }) => {
    console.log(
      "Removing comment with postId:",
      postId,
      "and commentId:",
      commentId
    );
    try {
      const response = await deleteComment({ commentId });
      return { postId, commentId, message: response.message };
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

      .addCase(removeComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;
        state.comments[postId] =
          state.comments[postId]?.filter(
            (comment) => comment.id !== commentId
          ) || [];
        localStorage.setItem(
          `comments_${postId}`,
          JSON.stringify(state.comments[postId])
        );
        state.loading = false;
      })
      .addCase(removeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
