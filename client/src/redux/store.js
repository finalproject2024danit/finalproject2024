import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './slices/authSlice.js';
import chatReducer from "./slices/chatSlice.js";
import userReducer from "./slices/userSlice.js";

export const store = configureStore({
    reducer: {
        // auth: authReducer,
        chat: chatReducer,
        user: userReducer
    },
});

export default store;
