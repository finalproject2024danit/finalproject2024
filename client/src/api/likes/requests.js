import axiosInstance from '../axiosInstance.js'

export const getLikeById = async (id) => {
    const response = await axiosInstance.get(`/likes/like/post/${id}`)
    return response.data
}

export const likePost = async (postId, userId) => {
    console.log("post",postId);
    console.log("user",userId);
    try {
      const response = await axiosInstance.post('/likes/liked', {
        postId,
        userId,
      });
      return response.data;
    } catch (error) {
      console.error('Error liking post:', error.response?.data || error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);  // Виведення тіла відповіді
      }
      throw error;
    }
  };
  
