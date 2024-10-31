import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial chat state
const initialState = {
    messages: [],
    loading: true,
    error: null,
    selectedUser: null,
};

export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async ({ userFrom, userTo }, thunkAPI) => {
        try {
            const response = await axios.get(`/api/v1/messages/between/${userFrom}/${userTo}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Thunk to fetch messages (you can mock an API or use static data)
export const fetchTalks = createAsyncThunk(
    'chat/fetchTalks',
    async () => {
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
            })
            // Handling fetchTalks actions
            .addCase(fetchTalks.pending, (state) => {
                state.loading = true; // Set loading state to true
            })
            .addCase(fetchTalks.fulfilled, (state, action) => {
                state.loading = false; // Set loading state to false
                state.talks = action.payload; // Set the talks in the state
            })
            .addCase(fetchTalks.rejected, (state, action) => {
                state.loading = false; // Set loading state to false
                state.error = action.payload || action.error.message; // Handle error
            });
    },
});

export const { sendMessage, selectUser } = chatSlice.actions;

export default chatSlice.reducer;
