import axiosInstance from '../axiosInstance.js'

export const getHobbyById = async (id) => {
    const response = await axiosInstance.get(`/hobbies/${id}`)
    return response.data
}

export const updateHobby = async (id, requestHobbyDto) => {
    const response = await axiosInstance.patch(`/hobbies/update/${id}`, requestHobbyDto)
    return response.data
}