import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHobbyById, updateHobby } from "../../api/hobbies/requests.js";

export const fetchHobbiesByUserId = createAsyncThunk(
  "hobbies/fetchHobbiesByUserId",
  async (userId) => {
    const hobby = await getHobbyById(userId);
    return { userId, hobby };
  }
);

export const updateHobbies = createAsyncThunk(
  "hobbies/updateHobbies",
  async ({ userId, updatedHobby }) => {
    const response = await updateHobby(userId, updatedHobby);
    return { userId, hobby: response };
  }
);

const hobbiesSlice = createSlice({
  name: "hobbies",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHobbiesByUserId.fulfilled, (state, action) => {
      const { userId, hobby } = action.payload;
      state[userId] = hobby;
    });

    builder.addCase(updateHobbies.fulfilled, (state, action) => {
      const { userId, hobby } = action.payload;
      state[userId] = hobby;
    });

    builder.addCase(fetchHobbiesByUserId.rejected, (state, action) => {
      console.error(
        "Failed to fetch hobbies:",
        action.payload || action.error.message
      );
      state.error = "Failed to fetch hobbies";
    });
    builder.addCase(updateHobbies.rejected, (state, action) => {
      console.error(
        "Failed to update hobbies:",
        action.payload || action.error.message
      );
      state.error = "Failed to update hobbies";
    });
  },
});

export default hobbiesSlice.reducer;
