import axiosInstance from '../../axiosInstance';

// Utility function to handle errors
const handleError = (error) => {
    console.error('API Error:', error.message);
    if (error.response) {
        console.error(`Status ${error.response.status}:`, error.response.data);
    }
    throw error; // Optionally rethrow if you want to handle it further up
};

// Fetch all conversations
export const getAllConversations = async () => {
    try {
        const response = await axiosInstance.get('/messages/conversations/{userId}');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Get a specific conversation by userFromId and userToId
export const getConversation = async (userFromId, userToId) => {
    try {
        const response = await axiosInstance.get('/messages/conversations/{userId}/filter', {
            params: { userFromId, userToId },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Create a new conversation
export const createConversation = async (conversationDto) => {
    try {
        const response = await axiosInstance.post('/messages/conversations/{userId}', conversationDto);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Add a message to a conversation
export const addMessageToConversation = async (userFromId, userToId, messageDto) => {
    try {
        const response = await axiosInstance.post(`/messages/conversations/{userId}/${userFromId}/${userToId}/add-message`, messageDto);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Delete a conversation by userFromId and userToId
export const deleteConversation = async (userFromId, userToId) => {
    try {
        await axiosInstance.delete(`messages/conversations/{userId}/${userFromId}/${userToId}`);
    } catch (error) {
        handleError(error);
    }
};
