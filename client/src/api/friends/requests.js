import axiosInstance from '../axiosInstance.js'

export const addFriend = async (userFromId, userToId) => {
    return await axiosInstance.post(`friends/add`, null, {
        params: {userFromId, userToId}
    })
}
export const deleteFriend = async (friendId) => {
    return await axiosInstance.delete(`friends/delete/${friendId}`)
}

export const searchFriendsByFullName = async (currentUserId, fullName) => {
    return await axiosInstance.get(`friends/search`, {
        params: {currentUserId, fullName}
    })
}
