import axiosInstance from "../axiosInstance.js";

export const addFriend = async (userFromId, userToId) => {
  return await axiosInstance.post(`friends/add`, null, {
    params: { userFromId, userToId },
  });
};
export const deleteFriend = async (userFromId, userToId) => {
  return await axiosInstance.delete(`friends/delete`, {
    userId1: userFromId,
    userId2: userToId,
  });
};

export const searchFriendsByFullName = async (currentUserId, fullName) => {
  return await axiosInstance.get(`friends/search`, {
    params: { currentUserId, fullName },
  });
};
