import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial chat state
const initialState = {
    messages: [],
    loading: false,
    error: null,
    selectedUser: null,
};

// Thunk to fetch messages (you can mock an API or use static data)
export const fetchMessages = createAsyncThunk('chat/fetchMessages', async () => {
    // Mocked response
    return [
        { id: 1, user: 'Lily Patel', message: 'Hello!', date: '27.04.2023', status: 'Online' },
        { id: 2, user: 'Adam Green', message: 'Hey guys, new ideas!', date: 'Today', status: 'Online' },
        // Add more mock messages
    ];
});

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        sendMessage: (state, action) => {
            // Add new message to state
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

export const { sendMessage, selectUser } = chatSlice.actions;

export default chatSlice.reducer;
