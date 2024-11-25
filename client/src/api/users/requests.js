import axiosInstance from "../axiosInstance.js";
import axios from "axios";

export const getToken = async (loginPayload) => {
    const response = await axios.post(
        "http://134.209.246.21:9000/auth/login", loginPayload);
    console.log(response.data.accessToken)
    return response.data.accessToken;
};

export const registerByEmail = async (registerPayload) => {
    const response = await axiosInstance.post("/users/create", registerPayload);
    return response.data;
}

export const getUserDataByToken = async (token) => {
    const response = await axios.post(
        "http://134.209.246.21:9000/auth/get_user",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const getUserData = async (userId) => {
    const response = await axiosInstance.get(`/users/user/${userId}`);
    return response.data;
};

export const getUserAllData = async (userId) => {
    const response = await axiosInstance.get(`/users/user_all_info/${userId}`);
    return response.data;
};

export const updateUser = async (userId, userData) => {
    const response = await axiosInstance.patch(
        `/users/patch/${userId}`,
        userData,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};

export const getUsers = async (
    startPage = 0,
    perPage = 10,
    sortBy = "id",
    sortDirection = "asc"
) => {
    const response = await axiosInstance.get("/users/filter", {
        params: {
            startPage,
            perPage,
            sortBy,
            sortDirection,
        },
    });
    return response.data;
};

export const createUser = async (userData) => {
    const response = await axiosInstance.post("/users/create", userData);
    return response.data;
};

export const getFriendsByUserId = async (userId) => {
    const response = await axiosInstance.get(`/${userId}/friends`);
    return response.data;
};

export const loginByEmail = async (userData) => {
    const response = await axiosInstance.post("users/login", userData);
    return response.data;
};
