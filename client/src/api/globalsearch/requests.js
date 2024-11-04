import axiosInstance from '../axiosInstance.js';

export const getSomething = async (something) => {
    const response = await axiosInstance.get(`/users/${something}`);
    return response.data;
};
