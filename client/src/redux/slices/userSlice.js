import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getUserAllData, updateUser} from "../../api/users/requests.js";

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
    workplace: "Space Exploration Technologies Corp (SpaceX)",
    residence: {
        planet: "Earth",
        country: "USA",
        city: "New York"
    },
    hobby: {
        language: "English",
        pet: "Dog",
        interest: "Reading"
    },
    createdDate: "2024-11-01T19:50:19.65788",
    lastModifiedDate: "2024-11-01T19:50:19.65788",
    status: 'idle',
    error: null
};

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await getUserAllData(userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserData = createAsyncThunk(
    'user/updateUserData',
    async ({ userId, userData }, { rejectWithValue }) => {
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
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
                state.status = 'succeeded';
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateUserData.pending, (state) => {
                state.status = 'loading';
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
