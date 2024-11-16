import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getAllConversations,
    createConversation as createNewConversation,
    deleteConversation as removeConversation,
} from '../../api/messages/conversations/request.js';

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
        // const { id: currentUserId } = thunkAPI.getState().auth.currentUser; <-- fails the slice
        const { id: currentUserId } = { id: 1, firstName: "conversationSlice", lastName: "fetchConversations", };
        try {
            // const response = await getAllConversations(currentUserId);
            // return response.filter(conversation => conversation.userId === currentUserId); <-- we already queryed conversations by the user, no need to filter
            return await getAllConversations(currentUserId);
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Thunk to create a new conversation
export const createConversation = createAsyncThunk(
    'conversation/createConversation',
    async (conversationDto, thunkAPI) => {
        try {
            const response = await createNewConversation(conversationDto);
            return response;
        } catch (error) {
            console.error('Failed to create conversation:', error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Thunk to delete a conversation
export const deleteConversation = createAsyncThunk(
    'conversation/deleteConversation',
    async ({ userFromId, userToId }, thunkAPI) => {
        try {
            await removeConversation(userFromId, userToId);
            return { userFromId, userToId };
        } catch (error) {
            console.error('Failed to delete conversation:', error);
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