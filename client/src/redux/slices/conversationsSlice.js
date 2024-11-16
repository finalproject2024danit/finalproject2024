import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial conversation state
const initialState = {
    conversations: [],
    loading: false,
    error: null,
};

// Thunk to fetch all conversations
export const fetchConversations = createAsyncThunk(
    'conversation/fetchConversations',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/api/v1/conversations');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Thunk to create a new conversation
export const createConversation = createAsyncThunk(
    'conversation/createConversation',
    async (conversationDto, thunkAPI) => {
        try {
            const response = await axios.post('/api/v1/conversations', conversationDto);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Thunk to delete a conversation
export const deleteConversation = createAsyncThunk(
    'conversation/deleteConversation',
    async ({ userFromId, userToId }, thunkAPI) => {
        try {
            await axios.delete(`/api/v1/conversations/${userFromId}/${userToId}`);
            return { userFromId, userToId };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        // Optional reducers for additional state updates
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchConversations actions
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
            // Handle createConversation actions
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
            // Handle deleteConversation actions
            .addCase(deleteConversation.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteConversation.fulfilled, (state, action) => {
                state.loading = false;
                state.conversations = state.conversations.filter(
                    (conv) => !(conv.userFromId === action.payload.userFromId && conv.userToId === action.payload.userToId)
                );
            })
            .addCase(deleteConversation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default conversationSlice.reducer;
