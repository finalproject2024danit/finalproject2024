import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './slices/authSlice.js';
import chatReducer from "./slices/chatSlice.js";
import userReducer from "./slices/userSlice.js";
import groupReducer from "./slices/groupSlice.js";
import friendsReducer from "./slices/friendsSlice.js";
import hobbiesReducer from "./slices/hobbiesSlice.js";
import residencesReducer from "./slices/residencesSlice.js";


export const store = configureStore({
    reducer: {
        // auth: authReducer,
        chat: chatReducer,
        user: userReducer,
        group: groupReducer,
        friends: friendsReducer,
        hobbies: hobbiesReducer,
        residences: residencesReducer,        
    },
});

export default store;
