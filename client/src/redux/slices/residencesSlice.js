import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getResidenceById,
  updateResidence,
  getAllResidences,
} from "../../api/residences/requests.js";

export const fetchResidenceById = createAsyncThunk(
  "residences/fetchResidenceById",
  async (userId) => {
    const response = await getResidenceById(userId);
    return { userId, residence: response };
  }
);

export const updateResidenceData = createAsyncThunk(
  "residences/updateResidenceData",
  async ({ userId, updateData }) => {
    const response = await updateResidence(userId, updateData);
    localStorage.setItem("residenceData", JSON.stringify(response));
    return { userId, residence: response };
  }
);

export const fetchAllResidences = createAsyncThunk(
  "residences/fetchAllResidences",
  async ({ page = 0, size = 10, sortBy = "id", sortDirection = "asc" }) => {
    const response = await getAllResidences(page, size, sortBy, sortDirection);
    return response;
  }
);

const residencesSlice = createSlice({
  name: "residences",
  initialState: {
    byUserId: {},
    allResidences: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResidenceById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResidenceById.fulfilled, (state, action) => {
        state.loading = false;
        state.byUserId[action.payload.userId] = action.payload.residence;
      })
      .addCase(fetchResidenceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateResidenceData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateResidenceData.fulfilled, (state, action) => {
        // Оновлення даних у Redux
        state.byUserId[action.payload.userId] = action.payload.residence;

        // Збереження в localStorage
        localStorage.setItem(
          "residenceData",
          JSON.stringify(action.payload.residence)
        );
      })
      .addCase(updateResidenceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchAllResidences.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllResidences.fulfilled, (state, action) => {
        state.loading = false;
        state.allResidences = action.payload.content;
      })
      .addCase(fetchAllResidences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default residencesSlice.reducer;
