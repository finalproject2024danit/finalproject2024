import axiosInstance from '../../axiosInstance';

// Fetch all conversations
export const getAllConversations = async () => {
    const response = await axiosInstance.get('/conversations');
    return response.data;
};

// Get a specific conversation by userFromId and userToId
export const getConversation = async (userFromId, userToId) => {
    const response = await axiosInstance.get('/conversations/filter', {
        params: {
            userFromId,
            userToId,
        },
    });
    return response.data;
};

// Create a new conversation
export const createConversation = async (conversationDto) => {
    const response = await axiosInstance.post('/conversations', conversationDto);
    return response.data;
};

// Add a message to a conversation
export const addMessageToConversation = async (userFromId, userToId, messageDto) => {
    const response = await axiosInstance.post(`/conversations/${userFromId}/${userToId}/add-message`, messageDto);
    return response.data;
};

// Delete a conversation by userFromId and userToId
export const deleteConversation = async (userFromId, userToId) => {
    await axiosInstance.delete(`/conversations/${userFromId}/${userToId}`);
};
