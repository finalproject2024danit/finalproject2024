import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUserAllData,
  updateUser,
  getUserDataByToken,
} from "../../api/users/requests.js";

// Початковий стан
const initialState = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  dateOfBirth: null,
  avatar: "",
  phones: "",
  photoData: "",
  workplace: "",
  residence: {
    planet: "",
    country: "",
    city: "",
  },
  hobby: {
    language: "",
    pet: "",
    interest: "",
  },
  createdDate: "",
  lastModifiedDate: "",
  status: "idle", // "idle", "loading", "succeeded", "failed"
  error: null, // Для зберігання повідомлень про помилки
};

// Асинхронні дії
export const fetchUserDataByToken = createAsyncThunk(
  "user/fetchUserDataByToken",
  async (token, { rejectWithValue }) => {
    try {
      const response = await getUserDataByToken(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUserAllData(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await updateUser(userId, userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      Object.assign(state, action.payload);
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    clearUserData(state) {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = "loading";
      state.error = null;
    };

    const handleFulfilled = (state, action) => {
      // Глибоке оновлення вкладених об'єктів
      if (action.payload.residence) {
        state.residence = { ...state.residence, ...action.payload.residence };
      }
      if (action.payload.hobby) {
        state.hobby = { ...state.hobby, ...action.payload.hobby };
      }

      Object.assign(state, action.payload);      
      state.status = "succeeded";
    };

    const handleRejected = (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    };

    builder
      .addCase(fetchUserDataByToken.pending, handlePending)
      .addCase(fetchUserDataByToken.fulfilled, handleFulfilled)
      .addCase(fetchUserDataByToken.rejected, handleRejected)
      .addCase(fetchUserData.pending, handlePending)
      .addCase(fetchUserData.fulfilled, handleFulfilled)
      .addCase(fetchUserData.rejected, handleRejected)
      .addCase(updateUserData.pending, handlePending)
      .addCase(updateUserData.fulfilled, handleFulfilled)
      .addCase(updateUserData.rejected, handleRejected);
  },
});

// Експортуємо дії та ред'юсер
export const { setUserData, setToken, clearUserData } = userSlice.actions;
export default userSlice.reducer;
