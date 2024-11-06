import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './slices/authSlice.js';
import chatReducer from "./slices/chatSlice.js";
import userReducer from "./slices/userSlice.js";
import groupReducer from "./slices/groupSlice.js";

export const store = configureStore({
    reducer: {
        // auth: authReducer,
        chat: chatReducer,
        user: userReducer,
        group: groupReducer,
    },
});

export default store;
