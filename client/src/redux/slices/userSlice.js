import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getNewToken,
  getToken,
  getUserAllData,
  getUserDataByToken,
  registerByEmail,
  updateUser,
} from "../../api/users/requests.js";

const initialState = {
  token: localStorage.getItem("authToken") || "",
  tokenExpirationDate: localStorage.getItem("authTokenExpirationDate") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  refreshTokenExpirationDate:
    localStorage.getItem("refreshTokenExpirationDate") || "",
  id: localStorage.getItem("id") || null,
  firstName: localStorage.getItem("firstName") || "",
  lastName: localStorage.getItem("lastName") || "",
  email: localStorage.getItem("email") || "",
  gender: localStorage.getItem("gender") || "",
  dateOfBirth: localStorage.getItem("dateOfBirth") || null,
  avatar: localStorage.getItem("avatar") || "",
  phones: localStorage.getItem("phones") || "",
  photoData: localStorage.getItem("photoData") || "",
  workplace: localStorage.getItem("workplace") || "",
  residence: {
    planet: localStorage.getItem("residence.planet") || "",
    country: localStorage.getItem("residence.country") || "",
    city: localStorage.getItem("residence.city") || "",
  },
  hobby: {
    language: localStorage.getItem("hobby.language") || "",
    pet: localStorage.getItem("hobby.pet") || "",
    interest: localStorage.getItem("hobby.interest") || "",
  },
  createdDate: localStorage.getItem("createdDate") || "",
  lastModifiedDate: localStorage.getItem("lastModifiedDate") || "",
  status: "idle",
  error: null,
};

export const fetchUserDataByToken = createAsyncThunk(
  "user/fetchUserDataByToken",
  async (token, { rejectWithValue }) => {
    try {
      return await getUserDataByToken(token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const handleTokenResponse = (response) => {
  const currentTimestamp = Date.now();
  const authTokenTerm = 300;
  const refreshTokenTerm = 30;

  const authTokenExpirationDate =
    currentTimestamp + (authTokenTerm - 1) * 60 * 1000;
  const refreshTokenExpirationDate =
    currentTimestamp + refreshTokenTerm * 24 * (60 - 1) * 60 * 1000;

  localStorage.setItem("authToken", response.accessToken);
  localStorage.setItem("refreshToken", response.refreshToken);
  localStorage.setItem(
    "authTokenExpirationDate",
    authTokenExpirationDate.toString()
  );
  localStorage.setItem(
    "refreshTokenExpirationDate",
    refreshTokenExpirationDate.toString()
  );
};

export const fetchToken = createAsyncThunk(
  "user/fetchToken",
  async (loginPayload, { rejectWithValue }) => {
    try {
      const response = await getToken(loginPayload);
      handleTokenResponse(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchNewToken = createAsyncThunk(
  "user/fetchNewToken",
  async (refreshToken, { rejectWithValue }) => {
    try {
      const response = await getNewToken(refreshToken);
      handleTokenResponse(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  "user/fetchRegister",
  async (registerPayload, { rejectWithValue }) => {
    try {
      const response = await registerByEmail(registerPayload);
      handleTokenResponse(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (userId, { rejectWithValue }) => {
    try {
      return await getUserAllData(userId);
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
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      Object.assign(state, action.payload);
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setTokenExpirationDate(state, action) {
      state.tokenExpirationDate = action.payload;
    },
    clearUserData() {
      localStorage.clear();
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = "loading";
      state.error = null;
    };

    const handleFulfilled = (state, action) => {
      if (action.payload.residence) {
        state.residence = { ...state.residence, ...action.payload.residence };
      }
      if (action.payload.hobby) {
        state.hobby = { ...state.hobby, ...action.payload.hobby };
      }

      Object.assign(state, action.payload);
      state.status = "succeeded";
    };

    const handleRejected = (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      console.error("Error fetching user data:", action.payload);
    };

    builder
      .addCase(fetchUserDataByToken.pending, handlePending)
      .addCase(fetchUserDataByToken.fulfilled, (state, action) => {
        const {
          id,
          firstName,
          lastName,
          email,
          gender,
          dateOfBirth,
          avatar,
          phones,
          photoData,
          workplace,
          residence,
          hobby,
          createdDate,
          lastModifiedDate,
        } = action.payload;

        const localStorageData = {
          id: id || "",
          firstName: firstName || "",
          lastName: lastName || "",
          email: email || "",
          gender: gender || "",
          dateOfBirth: dateOfBirth || "",
          avatar: avatar || "",
          phones: phones || "",
          photoData: photoData || "",
          workplace: workplace || "",
          "residence.planet": residence?.planet || "",
          "residence.country": residence?.country || "",
          "residence.city": residence?.city || "",
          "hobby.language": hobby?.language || "",
          "hobby.pet": hobby?.pet || "",
          "hobby.interest": hobby?.interest || "",
          createdDate: createdDate || "",
          lastModifiedDate: lastModifiedDate || "",
        };

        Object.entries(localStorageData).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });

        Object.assign(state, {
          id: id || "",
          firstName: firstName || "",
          lastName: lastName || "",
          email: email || "",
          gender: gender || "",
          dateOfBirth: dateOfBirth || "",
          avatar: avatar || "",
          phones: phones || "",
          photoData: photoData || "",
          workplace: workplace || "",
          residence: {
            planet: residence?.planet || "",
            country: residence?.country || "",
            city: residence?.city || "",
          },
          hobby: {
            language: hobby?.language || "",
            pet: hobby?.pet || "",
            interest: hobby?.interest || "",
          },
          createdDate: createdDate || "",
          lastModifiedDate: lastModifiedDate || "",
        });
      })
      .addCase(fetchUserDataByToken.rejected, handleRejected)
      .addCase(fetchUserData.pending, handlePending)
      .addCase(fetchUserData.fulfilled, handleFulfilled)
      .addCase(fetchUserData.rejected, handleRejected)
      .addCase(updateUserData.pending, handlePending)
      .addCase(updateUserData.fulfilled, handleFulfilled)
      .addCase(updateUserData.rejected, handleRejected)
      .addCase(fetchToken.pending, handlePending)
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(fetchToken.rejected, handleRejected)
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.id = action.payload.id;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.email = action.payload.email;
      })
      .addCase(fetchRegister.rejected, handleRejected)
      .addCase(fetchNewToken.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(fetchNewToken.pending, handlePending)
      .addCase(fetchNewToken.rejected, handleRejected);
  },
});

export const { setUserData, setToken, clearUserData, setTokenExpirationDate } =
  userSlice.actions;
export default userSlice.reducer;
