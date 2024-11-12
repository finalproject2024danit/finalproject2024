import axiosInstance from '../axiosInstance.js'

export const getAllGroupsFiltered = async (startPage = 0, perPage = 27, sortBy = 'id', sortDirection = 'asc') => {
    const response = await axiosInstance.get('/groups/filter', {
        params: {
            startPage,
            perPage,
            sortBy,
            sortDirection
        },
    });
    return response.data;
};

export const getGroupById = async (id) => {
    const response = await axiosInstance.get(`/groups/${id}`);
    return response.data;
}

export const createGroup = async (requestGroupDto) => {
    const response = await axiosInstance.post('/groups', requestGroupDto)
    return response.data
}

export const deleteGroup = async (id) => {
    await axiosInstance.delete(`/groups/${id}`)
}

export const addUserToGroup = async (userGroupDto) => {
    await axiosInstance.post('/groups/add-user', userGroupDto)
}

export const removeUserFromGroup = async (userGroupDto) => {
    await axiosInstance.delete('/groups/remove-user', {data: userGroupDto})
}

export const getGroupByName = async (name) => {
    const response = await axiosInstance.get(`/groups/name/${name}`)
    return response.data
}

export const searchGroupsByName = async (name) => {
    const response = await axiosInstance.get(`/groups/search/${name}`)
    return response.data
}