// src/slices/friendsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addFriend, deleteFriend, searchFriendsByFullName } from '../../api/friends/requests.js';
import axiosInstance from '../../api/axiosInstance.js';

// Створимо асинхронне діяння для отримання друзів
export const fetchFriends = createAsyncThunk(
  'friends/fetchFriends',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}/friends`);
      console.log(response.data);
      return response.data; // Повертаємо отримані дані
    } catch (error) {
      console.error("Failed to fetch friends:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Створимо асинхронне діяння для додавання друга
export const addFriendThunk = createAsyncThunk(
  'friends/addFriend',
  async ({ userFromId, userToId }, { rejectWithValue }) => {
    try {
      const response = await addFriend(userFromId, userToId);
      return response.data; // Повертаємо дані після додавання
    } catch (error) {
      console.error("Failed to add friend:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Створимо асинхронне діяння для видалення друга
export const deleteFriendThunk = createAsyncThunk(
  'friends/deleteFriend',
  async (friendId, { rejectWithValue }) => {
    try {
      await deleteFriend(friendId); // Виконуємо видалення
      return friendId; // Повертаємо ID видаленого друга
    } catch (error) {
      console.error("Failed to delete friend:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Створимо асинхронне діяння для пошуку друзів
export const searchFriendsThunk = createAsyncThunk(
  'friends/searchFriends',
  async ({ currentUserId, fullName }, { rejectWithValue }) => {
    try {
      const response = await searchFriendsByFullName(currentUserId, fullName);
      return response.data; // Повертаємо знайдених друзів
    } catch (error) {
      console.error("Failed to search friends:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  friends: [],
  status: 'idle',
  error: null,
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addFriendThunk.fulfilled, (state, action) => {
        state.friends.push(action.payload); // Додаємо нового друга до списку
      })
      .addCase(addFriendThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteFriendThunk.fulfilled, (state, action) => {
        state.friends = state.friends.filter(friend => friend.id !== action.payload); // Видаляємо друга зі списку
      })
      .addCase(deleteFriendThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(searchFriendsThunk.fulfilled, (state, action) => {
        state.friends = action.payload; // Оновлюємо список друзів на основі результатів пошуку
      });
      .addCase(searchFriendsThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
},
});

export default friendsSlice.reducer;


