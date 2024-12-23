import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  messages: [],
  talks: [],
  loading: true,
  error: null,
  selectedUser: null,
};

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async ({ userFrom, userTo }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/v1/messages/between/${userFrom}/${userTo}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    receivedMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { receivedMessage, selectUser } = chatSlice.actions;

export default chatSlice.reducer;
