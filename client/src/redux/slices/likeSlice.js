import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { likePost } from "../../api/likes/requests";

export const addLike = createAsyncThunk(
  "like/addLike",
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const response = await likePost(postId, userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  likes: JSON.parse(localStorage.getItem("likes")) || {},
  loading: false,
  error: null,
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        const { postId, likesCount } = action.payload;

        state.likes[postId] = likesCount;
        state.loading = false;

        const storedLikes = { ...state.likes };
        localStorage.setItem("likes", JSON.stringify(storedLikes));
      })
      .addCase(addLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default likeSlice.reducer;
