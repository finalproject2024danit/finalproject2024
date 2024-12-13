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
      console.error("Failed to add friend:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteFriendThunk = createAsyncThunk(
  "friends/deleteFriend",
  async ({ userFromId, userToId }, { rejectWithValue }) => {
    try {
      console.log("Attempting to delete friend:", { userFromId, userToId });

      const response = await axios.delete("/api/v1/friends/delete", {
        data: { userFromId, userToId },
      });

      console.log("Friend deleted successfully:", response.data);
      return { userToId };  // Повертаємо лише ID видаленого друга
    } catch (error) {
      console.error("Failed to delete friend:", error);
      return rejectWithValue(error.message);
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
      console.error("Failed to search friends:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchFriendsWithPagination = createAsyncThunk(
  "friends/fetchFriendsWithPagination",
  async ({ userId, startPage, perPage = 3 }, { rejectWithValue }) => {
    try {
      console.log(`Fetching friends for userId: ${userId}, startPage: ${startPage}, perPage: ${perPage}`); // Логування параметрів запиту
      const response = await axiosInstance.get(`/users/${userId}/friends`, {
        params: { startPage, perPage },
      });
      console.log("Friends data received:", response.data); // Логування отриманих даних
      return { friends: response.data, startPage };
    } catch (error) {
      console.error("Error fetching friends:", error); // Логування помилок
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
        state.error = null;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addFriendThunk.fulfilled, (state, action) => {
        state.friends.push(action.payload);
      })
      .addCase(addFriendThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteFriendThunk.fulfilled, (state, action) => {
        // Видаляємо друга за ID
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
        state.error = null;
      })
      .addCase(fetchFriendsWithPagination.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { friends, startPage } = action.payload;
    
        // Якщо списку друзів немає або їх менше ніж потрібно (3), припиняємо пагінацію
        state.hasMore = friends.length >= 3;
    
        // Якщо це перша сторінка, то замінюємо список друзів, інакше додаємо нових
        if (startPage === 1) {
            state.friends = friends;
        } else {
            // Для фільтрації унікальних друзів краще використати Set для перевірки наявності id
            const existingIds = new Set(state.friends.map(friend => friend.id));
            const uniqueFriends = friends.filter(friend => !existingIds.has(friend.id));
            
            // Додаємо нові унікальні елементи
            state.friends = [...state.friends, ...uniqueFriends];
        }
    
        // Оновлюємо поточну сторінку
        state.currentPage = startPage;
    })
    
      .addCase(fetchFriendsWithPagination.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.toString() || "Unknown error";
        // Не змінюємо hasMore при помилці, щоб дозволити подальші запити
      });
      
  },
});

export default friendsSlice.reducer;
