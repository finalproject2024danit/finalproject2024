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
    <div className={styles.container}>
      <div className={styles.row}>
        <MainContent title="Chat">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className={styles.discussions}>
              <div className={styles.discussionsSearch}>
          <div className={styles.searchbar}>
            <i className={styles.fa-search} aria-hidden="true"></i>
            <input type="text" placeholder="Search..."></input>
          </div>
        </div>
            <div className={styles.userList}>
                {/* User list */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={styles.discussion}
                    onClick={() => handleUserSelect(msg.user)}
                  >
                    <img src={msg.avatar} alt={msg.user} className={styles.photo} />
                    <div className={styles.descContact}>
                      <span className={styles.name}>{msg.user}</span> - 
                      <p className={styles.message}>You can't see me</p>
                    </div>
                    <div className={styles.status}>{msg.status}</div>
                  </div>
                ))}
            </div>

          </div> 
        </div>
        

<div className={styles.chat}>
<div className={styles.headerChat}>
{/* <i className={styles.icon} aria-hidden="true"></i>
<p className={styles.name}>Megan Leib</p>
<i className={styles.icon} aria-hidden="true"></i> */}
</div>
                {/* Message history */}
                {selectedUser && (
                  <div>
                    <h2>{selectedUser}'s Messages</h2>

                    {messages
                      .filter((msg) => msg.user === selectedUser)
                      .map((msg) => (
                        <div className={styles.messageChat}>
                        <div key={msg.id} className={styles.message}>
                            <img src={msg.avatar} alt={msg.user} className={styles.photo} />
                          <div>
                            <p className={styles.text}>{msg.message}</p>
                            <span>{msg.date}</span>
                          </div>
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
