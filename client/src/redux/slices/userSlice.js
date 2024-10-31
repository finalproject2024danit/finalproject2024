import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {updateUser} from "../../api/requests.js";

const initialState = {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    gender: "FEMALE",
    dateOfBirth: 631152000000,
    avatar: "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728655770/runners_silhouettes_athletes_fitness_men_healthy_sunset_dusk-907233_ah4dpa.jpg",
    phones: "12345",
    photoData: "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728655770/runners_silhouettes_athletes_fitness_men_healthy_sunset_dusk-907233_ah4dpa.jpg",
    createdDate: "2024-10-27T14:15:50.866613",
    lastModifiedDate: "2024-10-27T14:15:50.866613",
    status: 'idle',
    error: null
};

export const updateUserData = createAsyncThunk(
    'user/updateUserData',
    async ({ userId, userData }, { rejectWithValue }) => { // Добавляем userId в аргументы
        try {
            return await updateUser(userId, userData);
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to update user data");
            }
            return rejectWithValue(error.message);
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateUserData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
                state.status = 'succeeded';
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;
