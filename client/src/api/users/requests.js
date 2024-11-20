import axiosInstance from '../axiosInstance.js'

// const userResponse = await axiosInstance.post('/auth/get_user', {}, { 
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

export const getUserData = async (userId) => {
    const response = await axiosInstance.get(`/users/user/${userId}`)
    return response.data
}

export const getUserAllData = async (userId) => {
    const response = await axiosInstance.get(`/users/user_all_info/${userId}`)
    return response.data
}

export const updateUser = async (userId, userData) => {
    const response = await axiosInstance.patch(`/users/patch/${userId}`, userData, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data
}

export const getUsers = async (startPage = 0, perPage = 10, sortBy = 'id', sortDirection = 'asc') => {
    const response = await axiosInstance.get('/users/filter', {
        params: {
            startPage,
            perPage,
            sortBy,
            sortDirection
        }
    });
    return response.data
}

export const createUser = async (userData) => {
    const response = await axiosInstance.post('/users/create', userData)
    return response.data
}

export const getFriendsByUserId = async (userId) => {
    const response = await axiosInstance.get(`/${userId}/friends`)
    return response.data
}

export const loginByEmail = async (userData) => {
    const response = await axiosInstance.post('users/login', userData)
    return response.data
}

