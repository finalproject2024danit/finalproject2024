import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllGroupsFiltered, getGroupById } from '../../api/groups/requests.js';

const initialState = {
  groups: [],
  selectedGroup: null,
  loading: false,
  error: null,
  page: 0,
  size: 10, // Розмір сторінки
};

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async ({ page, size }) => {
  try {
    const data = await getAllGroupsFiltered(page, size); // Передайте size до API
    return data; 
  } catch (error) {
    throw new Error('Не вдалося отримати групи');
  }
});

// Додатковий код не змінюється


export const fetchGroupById = createAsyncThunk('groups/fetchGroupById', async (id) => {
  try {
    const group = await getGroupById(id);
    return group; // Повертаємо отримані дані
  } catch (error) {
    throw new Error('Не вдалося отримати дані про групу');
  }
});

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1; // Збільшуємо номер сторінки
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groups.push(...action.payload); // Додаємо масив груп
        state.loading = false;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGroupById.fulfilled, (state, action) => {
        state.selectedGroup = action.payload; // Зберігаємо вибрану групу
      })
      .addCase(fetchGroupById.rejected, (state, action) => {
        state.error = action.error.message; // Обробка помилки
      });
  },
});

export const { incrementPage } = groupSlice.actions;

export default groupSlice.reducer;
