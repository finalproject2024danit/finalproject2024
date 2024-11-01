import axiosInstance from './axiosInstance.js';

export const getUserData = async (userId) => {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
};

export const updateUser = async (userId, userData) => {
    const response = await axiosInstance.patch(`/users/patch/${userId}`, userData, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
};