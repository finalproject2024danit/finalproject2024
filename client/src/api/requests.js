import axiosInstance from './axiosInstance.js'

export const updateUser = async (userId, userData) => {
    const response = await axiosInstance.patch(`/users/patch/${userId}`, userData, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.data;
}