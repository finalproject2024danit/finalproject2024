import axiosInstance from '../axiosInstance.js';

export const getNews = async (startPage = 0, perPage = 10, sortBy = 'id', sortDirection = 'asc') => {
    const response = await axiosInstance.get('/news/filter', {
        params: {
            startPage,
            perPage,
            sortBy,
            sortDirection
        }
    });
    return response.data;
}

export const getNewsById = async (id) => {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
}