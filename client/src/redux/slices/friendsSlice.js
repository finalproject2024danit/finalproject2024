// src/slices/friendsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addFriend, deleteFriend, searchFriendsByFullName } from '../../api/friends/requests.js';
import axiosInstance from '../../api/axiosInstance.js';

// Створимо асинхронне діяння для отримання друзів
export const fetchFriends = createAsyncThunk(
  'friends/fetchFriends',
  async (userId) => {
    const response = await axiosInstance.get(`/users/${userId}/friends`);
    console.log(response.data);
    return response.data; // Повертаємо отримані дані
  }
);

// Створимо асинхронне діяння для додавання друга
export const addFriendThunk = createAsyncThunk(
  'friends/addFriend',
  async ({ userFromId, userToId }) => {
    const response = await addFriend(userFromId, userToId);
    return response.data; // Повертаємо дані після додавання
  }
);

// Створимо асинхронне діяння для видалення друга
export const deleteFriendThunk = createAsyncThunk(
  'friends/deleteFriend',
  async (friendId) => {
    await deleteFriend(friendId); // Виконуємо видалення
    return friendId; // Повертаємо ID видаленого друга
  }
);

// Створимо асинхронне діяння для пошуку друзів
export const searchFriendsThunk = createAsyncThunk(
  'friends/searchFriends',
  async ({ currentUserId, fullName }) => {
    const response = await searchFriendsByFullName(currentUserId, fullName);
    return response.data; // Повертаємо знайдених друзів
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
      .addCase(deleteFriendThunk.fulfilled, (state, action) => {
        state.friends = state.friends.filter(friend => friend.id !== action.payload); // Видаляємо друга зі списку
      })
      .addCase(searchFriendsThunk.fulfilled, (state, action) => {
        state.friends = action.payload; // Оновлюємо список друзів на основі результатів пошуку
      });
  },
});

export default friendsSlice.reducer;


