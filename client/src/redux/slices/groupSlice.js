import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllGroupsFiltered, getGroupById } from '../../api/groups/requests.js';

const initialState = {
  groups: [],
  selectedGroup: null,
  loading: false,
  error: null,
};

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async ({ startPage = 0, perPage = 5 }) => {
    const data = await getAllGroupsFiltered(startPage, perPage);
    return data;
  }
);

export const fetchGroupById = createAsyncThunk('groups/fetchGroupById', async (id) => {
  const group = await getGroupById(id);
  return group;
});

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groups = [...state.groups, ...action.payload];
        state.loading = false;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGroupById.fulfilled, (state, action) => {
        state.selectedGroup = action.payload;
      })
      .addCase(fetchGroupById.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default groupSlice.reducer;

