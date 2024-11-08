import axiosInstance from '../axiosInstance.js'

export const addFriend = async (userFromId, userToId) => {
    return await axiosInstance.post(`friends/add`, null, {
        params: {userFromId, userToId}
    })
}
// Додавання друга через GET запит
// export const addFriend = async (userFromId, userToId) => {
//     try {
//       const response = await axiosInstance.post('friends/add', {
//         params: { userFromId, userToId },  // Параметри передаються через URL
//       });
//       return response.data;  // Повертаємо результат запиту
//     } catch (error) {
//       console.error('Error adding friend:', error.message);
//       throw error;  // Прокидаємо помилку
//     }
//   };

export const deleteFriend = async (friendId) => {
    return await axiosInstance.delete(`friends/delete/${friendId}`)
}

export const searchFriendsByFullName = async (currentUserId, fullName) => {
    return await axiosInstance.get(`friends/search`, {
        params: {currentUserId, fullName}
    })
}

