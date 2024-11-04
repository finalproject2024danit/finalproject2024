import axiosInstance from '../axiosInstance.js'

export const getResidenceById = async (id) => {
    const response = await axiosInstance.get(`/residences/${id}`);
    return response.data
}

export const updateResidence = async (id, updateData) => {
    const response = await axiosInstance.patch(`/residences/update/${id}`, updateData);
    return response.data
}

export const getAllResidences = async (page = 0, size = 10, sortBy = 'id', sortDirection = 'asc') => {
    const response = await axiosInstance.get('/residences/filter', {
        params: {
            page,
            size,
            sortBy,
            sortDirection
        }
    })
    return response.data
}