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
        {
            id: 1,
            user: "Lily Patel",
            date: "27.04.2023",
            message: "Agreed. In the meantime, let's keep pushing forward with this episode.",
            status: "Do not disturb",
            avatar: "https://ui-avatars.com/api/?name=Lily+Patel&background=random"
        },
        {
            id: 2,
            user: "Adam Green",
            date: "Today",
            message: "Hey guys, I was thinking about some character ideas for our show.",
            status: "Online",
            avatar: "https://ui-avatars.com/api/?name=Adam+Green&background=random"
        },
        {
            id: 3,
            user: "Emily Liu",
            date: "Just now",
            message: "Well, we definitely need a strong leader character.",
            status: "Online",
            avatar: "https://ui-avatars.com/api/?name=Emily+Liu&background=random"
        },
        {
            id: 4,
            user: "Marcus Chen",
            date: "Yesterday",
            message: "I love the new storyline direction!",
            status: "Offline",
            avatar: "https://ui-avatars.com/api/?name=Marcus+Chen&background=random"
        },
        {
            id: 5,
            user: "Lucas Ortiz",
            date: "2 hours ago",
            message: "The scene transitions need some improvement.",
            status: "Online",
            avatar: "https://ui-avatars.com/api/?name=Lucas+Ortiz&background=random"
        },
        {
            id: 6,
            user: "Lily Patel",
            date: "Just now",
            message: "We should discuss the theme music in our next meeting.",
            status: "Online",
            avatar: "https://ui-avatars.com/api/?name=Lily+Patel&background=random"
        },
        {
            id: 7,
            user: "Olivia Sharma",
            date: "1 hour ago",
            message: "The latest episode draft looks fantastic!",
            status: "Online",
            avatar: "https://ui-avatars.com/api/?name=Olivia+Sharma&background=random"
        },
        {
            id: 8,
            user: "David Singh",
            date: "2 days ago",
            message: "We might need to adjust the pacing of the script.",
            status: "Online",
            avatar: "https://ui-avatars.com/api/?name=David+Singh&background=random"
        },
        {
            id: 9,
            user: "Harper Singh",
            date: "Today",
            message: "Could we brainstorm more ideas for episode 5?",
            status: "Online",
            avatar: "https://ui-avatars.com/api/?name=Harper+Singh&background=random"
        },
        {
            id: 10,
            user: "Isabella Rivera",
            date: "Just now",
            message: "Don’t forget to review the soundtrack selection.",
            status: "Online",
            avatar: "https://ui-avatars.com/api/?name=Isabella+Rivera&background=random"
        },
        {
            id: 11,
            user: "Emily Liu",
            date: "Just now",
            message: "Well, we definitely need a strong leader character.",
            status: "Online",
            avatar: "https://ui-avatars.com/api/?name=Emily+Liu&background=random"
        },
        {
            id: 12,
            user: "Adam Green",
            date: "Today",
            message: "Hey, any updates on the new character design?",
            status: "Online",
            avatar: "https://ui-avatars.com/api/?name=Adam+Green&background=random"
        },
        {
            id: 13,
            user: "Sophia Zhang",
            date: "Yesterday",
            message: "We could add more depth to the villain character.",
            status: "Online",
            avatar: "https://ui-avatars.com/api/?name=Sophia+Zhang&background=random"
        },
        // Add more mock messages
    ];
});

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        selectedUser: null,
        loading: false,
    },
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
