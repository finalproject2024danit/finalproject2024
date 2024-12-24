import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllConversations,
  createConversation as createNewConversation,
  deleteConversation as removeConversation,
} from "../../api/messages/conversations/request.js";

const initialState = {
  conversations: [],
  loading: false,
  error: null,
};

export const fetchConversations = createAsyncThunk(
  "conversation/fetchConversations",
  async (_, thunkAPI) => {
    const { id: currentUserId } = thunkAPI.getState().auth.currentUser;
    try {
      return await getAllConversations(currentUserId);
    } catch (error) {
      console.error("Ошибка при получении разговоров:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createConversation = createAsyncThunk(
  "conversation/createConversation",
  async (conversationDto, thunkAPI) => {
    try {
      const response = await createNewConversation(conversationDto);
      return response;
    } catch (error) {
      console.error("Ошибка при создании разговора:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteConversation = createAsyncThunk(
  "conversation/deleteConversation",
  async ({ userFromId, userToId }, thunkAPI) => {
    try {
      await removeConversation(userFromId, userToId);
      return { userFromId, userToId };
    } catch (error) {
      console.error("Ошибка при удалении разговора:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createConversation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations.push(action.payload);
      })
      .addCase(createConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(deleteConversation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteConversation.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = state.conversations.filter(
          (conv) =>
            !(
              conv.userFromId === action.payload.userFromId &&
              conv.userToId === action.payload.userToId
            )
        );
      })
      .addCase(deleteConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default conversationSlice.reducer;
