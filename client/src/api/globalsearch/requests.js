import axiosInstance from '../axiosInstance.js';

// export const getSomething = async (something) => {
//     const response = await axiosInstance.get(`/users/${something}`);
//     return response.data;
// };

export const searchGlobal = async (keyword) => {
    try {
      const response = await axiosInstance.get('/search', {
        params: { keyword }
      });
      return response.data;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  };