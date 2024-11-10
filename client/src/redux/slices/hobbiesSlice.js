import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance.js';

export const fetchHobbiesByUserId = createAsyncThunk(
  'hobbies/fetchHobbiesByUserId',
  async (userId) => {
    const response = await axiosInstance.get(`/hobbies/${userId}`);
    return { userId, hobbies: response.data };
  }
);

const hobbiesSlice = createSlice({
  name: 'hobbies',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHobbiesByUserId.fulfilled, (state, action) => {
      const { userId, hobbies } = action.payload;
      state[userId] = hobbies;
    });
  },
});

export default hobbiesSlice.reducer;