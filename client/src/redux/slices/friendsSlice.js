import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addFriend,
  searchFriendsByFullName,
} from "../../api/friends/requests.js";
import axiosInstance from "../../api/axiosInstance.js";
import axios from "axios";

export const fetchFriends = createAsyncThunk(
  "friends/fetchFriends",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}/friends`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addFriendThunk = createAsyncThunk(
  "friends/addFriend",
  async ({ userFromId, userToId }, { rejectWithValue }) => {
    try {
      const response = await addFriend(userFromId, userToId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteFriendThunk = createAsyncThunk(
  "friends/deleteFriend",
  async ({ userFromId, userToId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/api/v1/friends/delete", {
        data: { userFromId, userToId },
      });
      return { userToId };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchFriendsThunk = createAsyncThunk(
  "friends/searchFriends",
  async ({ currentUserId, fullName }, { rejectWithValue }) => {
    try {
      const response = await searchFriendsByFullName(currentUserId, fullName);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchFriendsWithPagination = createAsyncThunk(
  "friends/fetchFriendsWithPagination",
  async ({ userId, startPage, perPage = 5 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}/friends`, {
        params: { startPage, perPage },
      });

      const friends = response.data;

      // Якщо це остання сторінка
      const hasMore = friends.length > 0;

      return { friends, startPage, hasMore };
    } catch (error) {
      // Якщо сервер повернув 404, припиняємо пагінацію
      if (error.response?.status === 404) {
        return { friends: [], startPage, hasMore: false };
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



const initialState = {
  friends: [],
  status: "idle",
  error: null,
  currentPage: 1,
  hasMore: true,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch friends";
      })
      .addCase(addFriendThunk.fulfilled, (state, action) => {
        state.friends.push(action.payload);
      })
      .addCase(addFriendThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteFriendThunk.fulfilled, (state, action) => {
        state.friends = state.friends.filter(
          (friend) => friend.id !== action.payload.userToId
        );
      })
      .addCase(deleteFriendThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(searchFriendsThunk.fulfilled, (state, action) => {
        state.friends = action.payload;
      })
      .addCase(searchFriendsThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchFriendsWithPagination.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFriendsWithPagination.fulfilled, (state, action) => {
        if (action.payload.startPage === 1) {
          state.friends = action.payload.friends;
        } else {
          state.friends = [...state.friends, ...action.payload.friends];
        }
        state.currentPage = action.payload.startPage;
        state.hasMore = action.payload.hasMore;
        state.status = "succeeded";
      })
      .addCase(fetchFriendsWithPagination.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
        state.hasMore = false; // Зупиняємо пагінацію у випадку помилки
      });
  },
});

export default friendsSlice.reducer;
