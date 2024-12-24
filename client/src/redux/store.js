import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice.js";
import userReducer from "./slices/userSlice.js";
import groupReducer from "./slices/groupSlice.js";
import friendsReducer from "./slices/friendsSlice.js";
import friendsPageReducer from "./slices/friendsPageSlice.js"
import hobbiesReducer from "./slices/hobbiesSlice.js";
import residencesReducer from "./slices/residencesSlice.js";
import newsReducer from "./slices/newsSlice.js";
import commentsReducer from "./slices/commentsSlice.js";
import globalsearchReducer from "./slices/searchSlice.js";
import conversationReducer from "./slices/conversationsSlice.js";
import languageReducer from "./slices/languageSlice.js";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    user: userReducer,
    group: groupReducer,
    friends: friendsReducer,
    friendsPage: friendsPageReducer,
    hobbies: hobbiesReducer,
    residences: residencesReducer,
    news: newsReducer,
    comments: commentsReducer,
    globalsearch: globalsearchReducer,
    conversations: conversationReducer,
    language: languageReducer,
  },
});

export default store;
