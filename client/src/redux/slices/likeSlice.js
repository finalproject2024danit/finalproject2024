import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { likePost } from '../../api/likes/requests'; 

// Функція для додавання лайку (через асинхронний thunk)
export const addLike = createAsyncThunk(
  'like/addLike',
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const response = await likePost(postId, userId); // Додаємо лайк через API
      return response; // Повертаємо результат (структура відповіді повинна містити postId та likesCount)
    } catch (error) {
      return rejectWithValue(error.message); // Повертаємо помилку, якщо є
    }
  }
);

const initialState = {
  likes: JSON.parse(localStorage.getItem('likes')) || {}, // Завантажуємо лайки з localStorage при ініціалізації
  loading: false,
  error: null,
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    // Додаткові редюсери (якщо потрібні)
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        const { postId, likesCount } = action.payload;

        // Оновлюємо кількість лайків для поста в Redux
        state.likes[postId] = likesCount; 
        state.loading = false;

        // Збереження лайків в localStorage
        const storedLikes = { ...state.likes }; // Копіюємо поточні лайки
        localStorage.setItem('likes', JSON.stringify(storedLikes)); // Зберігаємо в localStorage
      })
      .addCase(addLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default likeSlice.reducer;
