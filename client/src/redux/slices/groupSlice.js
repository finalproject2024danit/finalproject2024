import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllGroupsFiltered, getGroupById } from '../../api/groups/requests.js';

const initialState = {
  groups: [],
  selectedGroup: null,
  loading: false,
  page: 0,
  size: 10,
};

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async ({ page, size }) => {
  const data = await getAllGroupsFiltered(page, size);
  return { data, page };
});

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
        state.loading = true; // Залишаємо статус завантаження
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        const newGroups = action.payload.data.filter(group =>
          !state.groups.some(existingGroup => existingGroup.id === group.id)
        );
        state.groups.push(...newGroups);
        state.loading = false;

        if (newGroups.length > 0) {
          state.page += 1; // Збільшуємо номер сторінки
        }
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.loading = false; // Просто зупиняємо завантаження
      })
      .addCase(fetchGroupById.fulfilled, (state, action) => {
        state.selectedGroup = action.payload; // Зберігаємо вибрану групу
      })
      .addCase(fetchGroupById.rejected, () => {
        // Обробка помилки без state
      });
  },
});

export default groupSlice.reducer;


