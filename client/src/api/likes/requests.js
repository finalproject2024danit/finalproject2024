import axiosInstance from '../axiosInstance.js'

export const getLikeById = async (id) => {
    const response = await axiosInstance.get(`/likes/like/${id}`)
    return response.data
}

export const likePost = async (postId, userId) => {
    const response = await axiosInstance.post('/likes/liked', null, {
        params: {
            postId,
            userId
        }
    })
    return response.data
}