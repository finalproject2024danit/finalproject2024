import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, selectUser, sendMessage } from '../../redux/slices/chatSlice';
import NewMessageForm from "./NewMessageForm/NewMessageForm";
import MainContent from "../../components/MainContent/MainContent";
import styles from "./ChatPage.module.scss";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { messages, selectedUser, loading } = useSelector((state) => state.chat);

  useEffect(() =>{
    dispatch(fetchMessages());
  }, []);

  const handleUserSelect = (user) => {
    dispatch(selectUser(user));
  };

  const handleSendMessage = (message) => {
    dispatch(sendMessage(message));
  };

  return (
    <div className={styles.layout}>
      <div className={styles.mainContent}>
        <MainContent title="Chat">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className={styles.chatArea}>
              <div className={styles.userList}>
                {/* User list */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={styles.userItem}
                    onClick={() => handleUserSelect(msg.user)}
                  >
                    <img src={msg.avatar} alt={msg.user} className={styles.avatar} />
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{msg.user}</span> - 
                      <span className={styles.userStatus}>{msg.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.messageList}>
                {/* Message history */}
                {selectedUser && (
                  <div>
                    <h2>{selectedUser}'s Messages</h2>
                    {messages
                      .filter((msg) => msg.user === selectedUser)
                      .map((msg) => (
                        <div key={msg.id} className={styles.chatMessage}>
                            <img src={msg.avatar} alt={msg.user} className={styles.messageAvatar} />
                          <div className={styles.messageContent}>
                            <p>{msg.message}</p>
                            <span>{msg.date}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Formik form to send new message */}
          {selectedUser && (
            <NewMessageForm onSendMessage={handleSendMessage} selectedUser={selectedUser} />
          )}
        </MainContent>
      </div>
    </div>
  );
};

export default ChatPage;
