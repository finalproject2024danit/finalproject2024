import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getHobbyById, updateHobby } from '../../api/hobbies/requests.js';  // Імпортуємо функцію для отримання та оновлення хобі

// Функція для отримання хобі за userId
export const fetchHobbiesByUserId = createAsyncThunk(
  'hobbies/fetchHobbiesByUserId',
  async (userId) => {
    const hobby = await getHobbyById(userId);  // Використовуємо функцію для отримання хобі
    return { userId, hobby };  // Повертаємо отримані хобі
  }
);

// Функція для оновлення хобі
export const updateHobbies = createAsyncThunk(
  'hobbies/updateHobbies',
  async ({ userId, updatedHobby }) => {
    const response = await updateHobby(userId, updatedHobby);  // Використовуємо функцію для оновлення хобі
    return { userId, hobby: response };  // Повертаємо оновлене хобі
  }
);

const hobbiesSlice = createSlice({
  name: 'hobbies',
  initialState: {},  // Пустий об'єкт, щоб зберігати хобі за userId
  reducers: {},
  extraReducers: (builder) => {
    // Обробка успішного запиту на отримання хобі
    builder.addCase(fetchHobbiesByUserId.fulfilled, (state, action) => {
      const { userId, hobby } = action.payload;
      state[userId] = hobby;  // Зберігаємо хобі користувача в state
    });

    // Обробка успішного оновлення хобі
    builder.addCase(updateHobbies.fulfilled, (state, action) => {
      const { userId, hobby } = action.payload;
      state[userId] = hobby;  // Оновлюємо хобі в state
    });

    // Обробка помилок при отриманні або оновленні хобі
    builder.addCase(fetchHobbiesByUserId.rejected, (state, action) => {
      console.error('Failed to fetch hobbies:', action.payload || action.error.message);
      // Можна додати обробку помилки в state, наприклад:
      state.error = 'Failed to fetch hobbies';
    });
    builder.addCase(updateHobbies.rejected, (state, action) => {
      console.error('Failed to update hobbies:', action.payload || action.error.message);
      // Можна додати обробку помилки в state, наприклад:
      state.error = 'Failed to update hobbies';
    });
  },
});

export default hobbiesSlice.reducer;
