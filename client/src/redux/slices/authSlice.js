// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     currentUser: {
//         id: 1, 
//         firstName: "John",
//         lastName: "Doe",
//     },
//     isAuthenticated: true, 
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         setCurrentUser(state, action) {
//             state.currentUser = action.payload;
//         },
//     },
// });

// export const { setCurrentUser } = authSlice.actions;
// export default authSlice.reducer;




// const initialState = {
//     isLoggedIn: true,
//     user: null,
//     error: null,
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         loginSuccess: (state, action) => {
//             state.isLoggedIn = true;
//             state.user = action.payload;
//             state.error = null;
//         },
//         loginFailure: (state, action) => {
//             state.error = action.payload; // Set error message
//         },
//         logout: (state) => {
//             state.isLoggedIn = false;
//             state.user = null;
//             state.error = null;
//         },
//     },
// });

// export const { loginSuccess, loginFailure, logout } = authSlice.actions;
// export default authSlice.reducer;
