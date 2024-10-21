import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, selectUser, sendMessage } from '../../redux/slices/chatSlice';
import NewMessageForm from "./NewMessageForm/NewMessageForm";
import MainContent from "../../components/MainContent/MainContent";
import styles from "./ChatPage.module.scss";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { messages, selectedUser, loading } = useSelector((state) => state.chat);
  const [isFormVisible, setFormVisible] = useState(false); // State to control form visibility
  

  useEffect(() =>{
    dispatch(fetchMessages());
  }, []);

  const handleUserSelect = (user) => {
    dispatch(selectUser(user));
    setFormVisible(true);
  };

  const handleSendMessage = (message) => {
    dispatch(sendMessage(message));
  };

  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
  // };

  // const handlePrev = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
  // };

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

                    {/* Carousel Section */}
                    {/* {messages
                      .filter((msg) => msg.user === selectedUser)
                      .map((msg) => (
                    <div key={msg.id} className={styles.carousel}>
                      <button className={styles.prevButton} onClick={handlePrev}>Prev</button>

                      <div className={styles.carousel__item}>
                        <img
                          src={msg.avatar}
                          alt={msg.user}
                          className={styles.messageAvatar}
                        />
                        <div className={styles.carousel__text}>
                          <p>{msg.message}</p>
                          <span>{msg.date}</span>
                        </div>
                      </div>

                      <button className={styles.nextButton} onClick={handleNext}>Next</button>
                    </div>
                      ))} */}
                    {/* End of Carousel */}

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
          {selectedUser && isFormVisible && (
            <NewMessageForm onSendMessage={handleSendMessage} selectedUser={selectedUser} />
          )}
        </MainContent>
      </div>
    </div>
  );
};

export default ChatPage;
