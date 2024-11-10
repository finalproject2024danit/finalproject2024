import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getHobbyById } from '../../api/hobbies/requests.js';  // Імпортуємо функцію для отримання хобі за id

export const fetchHobbiesByUserId = createAsyncThunk(
  'hobbies/fetchHobbiesByUserId',
  async (userId) => {
    const response = await getHobbyById(userId);  // Використовуємо функцію для отримання хобі
    return { userId, hobbies: response };  // Повертаємо отримані хобі
  }
);

const hobbiesSlice = createSlice({
  name: 'hobbies',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHobbiesByUserId.fulfilled, (state, action) => {
      const { userId, hobbies } = action.payload;
      state[userId] = hobbies;  // Зберігаємо хобі користувача в state
    });
  },
});

export default hobbiesSlice.reducer;
