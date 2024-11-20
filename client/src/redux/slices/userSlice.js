import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserAllData, updateUser } from "../../api/users/requests.js";

const initialState = {
  id: 1,
  firstName: "Alice",
  lastName: "Johnson",
  email: "alice.johnson@example.com",
  gender: "FEMALE",
  dateOfBirth: 631152000000,
  avatar:
    "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728655814/fitness_jump_health_woman_girl_healthy_fit_sportive-1103572_mshkng.jpg",
  phones: "12345",
  photoData:
    "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728655814/fitness_jump_health_woman_girl_healthy_fit_sportive-1103572_mshkng.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633405/cld-sample-4.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633404/samples/dessert-on-a-plate.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633404/samples/coffee.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633403/samples/breakfast.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633402/samples/balloons.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633397/samples/landscapes/nature-mountains.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633397/samples/food/spices.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633397/samples/imagecon-group.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633397/samples/cloudinary-group.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633397/samples/landscapes/beach-boat.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633396/samples/animals/three-dogs.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633395/samples/food/fish-vegetables.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633395/samples/people/kitchen-bar.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633395/samples/food/pot-mussels.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633395/samples/food/dessert.jpg, https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728633395/samples/animals/cat.jpg",
  workplace: "Space Exploration Technologies Corp (SpaceX)",
  residence: {
    planet: "Earth",
    country: "USA",
    city: "New York",
  },
  hobby: {
    language: "English",
    pet: "Dog",
    interest: "Reading",
  },
  createdDate: "2024-11-01T19:50:19.65788",
  lastModifiedDate: "2024-11-01T19:50:19.65788",
  status: "idle",
  error: null,
};

// fetchUserDataByToken createAsyncThunk


export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
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
  "user/updateUserData",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      return await updateUser(userId, userData);
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to update user data"
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status = "succeeded";
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status = "succeeded";
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
