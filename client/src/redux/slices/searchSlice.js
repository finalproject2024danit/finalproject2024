import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchGlobal } from "../../api/globalsearch/requests";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const data = await searchGlobal(searchTerm);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching search results"
      );
    }
  }
);

const initialState = {
  results: [],
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "globalsearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;

        console.log("Search results:", action.payload);

        const users = action.payload[0] || [];
        const groups = action.payload[1] || [];

        state.results = [
          ...users.map((user) => ({
            value: `user-${user.id}`,
            label: `User: ${user.firstName} ${user.lastName}`,
            avatar: user.avatar,
          })),
          ...groups.map((group) => ({
            value: `group-${group.id}`,
            label: `Group: ${group.name}`,
          })),
        ];
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default searchSlice.reducer;
