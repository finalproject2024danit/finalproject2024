import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchGlobal } from '../../api/globalsearch/requests'; // Запит на глобальний пошук

// Асинхронна функція для пошуку
export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const data = await searchGlobal(searchTerm); // Використовуємо глобальний пошук
      return data; // Повертаємо результат пошуку
    } catch (error) {
      // Якщо виникла помилка, повертаємо її через rejectWithValue
      return rejectWithValue(error.response?.data?.message || 'Error fetching search results');
    }
  }
);

const initialState = {
  results: [], // Масив для зберігання результатів пошуку
  isLoading: false, // Статус завантаження
  error: null, // Статус помилки
};

const searchSlice = createSlice({
  name: 'globalsearch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Очищаємо помилку при новому запиті
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;

        // Лог для перевірки структури даних
        console.log('Search results:', action.payload);

        const users = action.payload[0] || []; // Отримуємо користувачів із першого масиву
        const groups = action.payload[1] || []; // Якщо є групи, обробляємо їх

        state.results = [
          ...users.map((user) => ({
            value: `user-${user.id}`,
            label: `User: ${user.firstName} ${user.lastName}`,
          })),
          ...groups.map((group) => ({
            value: `group-${group.id}`,
            label: `Group: ${group.name}`,
          })),
        ];
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        // Використовуємо message, якщо вона є, або стандартне повідомлення про помилку
        state.error = action.payload || action.error.message;
      });
  },
});

export default searchSlice.reducer;









