import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance.js';

export const getResidenceById = async (id) => {
  const response = await axiosInstance.get(`/residences/${id}`);
  return response.data;
};

export const fetchResidencesByUserId = createAsyncThunk(
  'residences/fetchResidencesByUserId',
  async (userId) => {
    const response = await getResidenceById(userId); // Викликаємо API для отримання даних про місце проживання
    return { userId, residences: response }; // Повертаємо дані місць проживання
  }
);

const residencesSlice = createSlice({
  name: 'residences',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResidencesByUserId.fulfilled, (state, action) => {
      const { userId, residences } = action.payload;
      state[userId] = residences; // Зберігаємо дані про місце проживання в state
    });
  },
});

export default residencesSlice.reducer;
