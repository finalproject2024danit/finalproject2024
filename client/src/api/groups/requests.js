import axiosInstance from '../axiosInstance.js';

const safeRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

// Групи
export const getAllGroupsFiltered = async (startPage = 0, perPage = 0, sortBy = 'id', sortDirection = 'asc') => {
  return await safeRequest(() =>
    axiosInstance.get('/groups/filter', {
      params: {
        startPage,
        perPage,
        sortBy,
        sortDirection,
      },
    })
  );
};

export const getGroupById = async (id) => {
  return await safeRequest(() => axiosInstance.get(`/groups/${id}`));
};

export const createGroup = async (requestGroupDto) => {
  return await safeRequest(() => axiosInstance.post('/groups', requestGroupDto));
};

export const deleteGroup = async (id) => {
  return await safeRequest(() => axiosInstance.delete(`/groups/${id}`));
};

export const addUserToGroup = async (userGroupDto) => {
  return await safeRequest(() =>
    axiosInstance.post('/groups/add-user', userGroupDto)
  );
};

export const removeUserFromGroup = async (userGroupDto) => {
  return await safeRequest(() =>
    axiosInstance.delete('/groups/remove-user', { data: userGroupDto })
  );
};

export const getGroupByName = async (name) => {
  return await safeRequest(() => axiosInstance.get(`/groups/name/${name}`));
};

export const searchGroupsByName = async (name) => {
  return await safeRequest(() => axiosInstance.get(`/groups/search/${name}`));
};

// Пости
export const createPost = async (postData) => {
  try {
    const response = await axiosInstance.post('/posts/create', postData);
    console.log(response.data); // Перевірте створений пост
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const updatePost = async (postId, postData) => {
  return await safeRequest(() =>
    axiosInstance.patch(`/posts/post/${postId}`, postData)
  );
};

export const deletePost = async (postId) => {
  return await safeRequest(() =>
    axiosInstance.delete(`/posts/delete/${postId}`)
  );
};
