import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHobbyById, updateHobby } from "../../api/hobbies/requests.js";

const saveToLocalStorage = (userId, hobby) => {
  localStorage.setItem(`hobbies-${userId}`, JSON.stringify(hobby));
};

const loadFromLocalStorage = (userId) => {
  const storedHobby = localStorage.getItem(`hobbies-${userId}`);
  return storedHobby ? JSON.parse(storedHobby) : null;
};

export const fetchHobbiesByUserId = createAsyncThunk(
  "hobbies/fetchHobbiesByUserId",
  async (userId) => {
    const hobby = await getHobbyById(userId);
    saveToLocalStorage(userId, hobby);
    return { userId, hobby };
  }
);

export const updateHobbies = createAsyncThunk(
  "hobbies/updateHobbies",
  async ({ userId, updatedHobby }) => {
    const response = await updateHobby(userId, updatedHobby);
    saveToLocalStorage(userId, response);
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

export const loadHobbiesFromLocalStorage = (userId) => {
  return (dispatch) => {
    const hobby = loadFromLocalStorage(userId);
    if (hobby) {
      dispatch(fetchHobbiesByUserId.fulfilled({ userId, hobby }));
    }
  };
};

export default hobbiesSlice.reducer;
