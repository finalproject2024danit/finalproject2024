import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getNews, getNewsById} from '../../api/news/requests.js'; 

const initialState = {
    news: [],
    newsItem: null,
    loading: false,
    error: null,
}

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async (_, {rejectWithValue}) => {
        try {
            return await getNews();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchNewsById = createAsyncThunk(
    'news/fetchNewsById',
    async (id, {rejectWithValue}) => {
        try {
            return await getNewsById(id); 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchNewsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewsById.fulfilled, (state, action) => {
                state.loading = false;
                state.newsItem = action.payload;
            })
            .addCase(fetchNewsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default newsSlice.reducer;

