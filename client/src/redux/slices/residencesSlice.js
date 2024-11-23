import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getResidenceById, updateResidence, getAllResidences } from '../../api/residences/requests.js';

// Функція для отримання місця проживання за id
export const fetchResidenceById = createAsyncThunk(
  'residences/fetchResidenceById',
  async (userId) => {
    const response = await getResidenceById(userId); // Викликаємо API для отримання даних
    return { userId, residence: response }; // Повертаємо отримані дані
  }
);

// Функція для оновлення місця проживання
export const updateResidenceData = createAsyncThunk(
  'residences/updateResidenceData',
  async ({ userId, updateData }) => {
    const response = await updateResidence(userId, updateData); // Викликаємо API для оновлення
    return { userId, residence: response }; // Повертаємо оновлені дані
  }
);

// Функція для отримання всіх місць проживання
export const fetchAllResidences = createAsyncThunk(
  'residences/fetchAllResidences',
  async ({ page = 0, size = 10, sortBy = 'id', sortDirection = 'asc' }) => {
    const response = await getAllResidences(page, size, sortBy, sortDirection);
    return response; // Повертаємо список місць проживання
  }
);

const residencesSlice = createSlice({
  name: 'residences',
  initialState: {
    byUserId: {}, // Зберігаємо дані за userId
    allResidences: [], // Масив для зберігання всіх місць проживання
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обробка запиту на отримання місця проживання
      .addCase(fetchResidenceById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResidenceById.fulfilled, (state, action) => {
        state.loading = false;
        state.byUserId[action.payload.userId] = action.payload.residence;
      })
      .addCase(fetchResidenceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Обробка запиту на оновлення місця проживання
      .addCase(updateResidenceData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateResidenceData.fulfilled, (state, action) => {
        state.loading = false;
        state.byUserId[action.payload.userId] = action.payload.residence;
      })
      .addCase(updateResidenceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Обробка запиту на отримання всіх місць проживання
      .addCase(fetchAllResidences.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllResidences.fulfilled, (state, action) => {
        state.loading = false;
        state.allResidences = action.payload.content; // Зберігаємо отримані дані
      })
      .addCase(fetchAllResidences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default residencesSlice.reducer;
