import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, selectUser, sendMessage } from "../../redux/slices/chatSlice";
import NewMessageForm from "./NewMessageForm/NewMessageForm";
import MainContent from "../../components/MainContent/MainContent";
import styles from "./ChatPage.module.scss";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { messages, selectedUser, loading } = useSelector((state) => state.chat);

  
  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleUserSelect = (user) => {
    dispatch(selectUser(user));
  };

  // const handleSendMessage = (message) => {
  //   dispatch(sendMessage(message));
  // };
  const handleSendMessage = (newMessage) => {
    dispatch(sendMessage(newMessage)); // Dispatch the action to send a message
  };

  const messagesList = [
    // Array of message objects
  ];
  
  
  

  const filteredMessages = messages.filter((msg) => msg.user === selectedUser);
console.log('Filtered Messages:', filteredMessages);


  return (
    <MainContent title="Chat">
    <div className={styles.container}>
        
        {/* Discussions Section */}
        <section className={styles.discussions}>
          <div className={`${styles.discussion} ${styles.search}`}>
            <div className={styles.searchbar}>
              <i className="fa fa-search" aria-hidden="true"></i>
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          
          {/* User List */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.discussion} ${msg.user === selectedUser ? styles.messageActive : ''}`}
                onClick={() => handleUserSelect(msg.user)}
              >
                <div className={styles.photo} style={{ backgroundImage: `url(${msg.userImage})` }}>
                  {msg.isOnline && <div className={styles.online}></div>}
                </div>
                <div className={styles.descContact}>
                  <p className={styles.name}>{msg.user}</p>
                  <p className={styles.message}>{msg.message}</p>
                </div>
                <div className={styles.timer}>{msg.date}</div>
              </div>
            ))
          )}
        </section>
        
        {/* Chat Section */}
       
        <section className={styles.chat}>
            <div className={styles.headerChat}>
              <i className={`fa fa-user-o ${styles.icon}`} aria-hidden="true"></i>
              {selectedUser && <p className={styles.name}>{selectedUser}</p>}
              <i className={`fa fa-ellipsis-h ${styles.icon} ${styles.clickable} ${styles.right}`} aria-hidden="true"></i>
            </div>
            
            {/* Messages History */}
            <div className={styles.messagesHistory}>
            {/* Render filtered messages here if needed */}
          </div>
            {/* <div className={styles.messagesChat}>
              {filteredMessages.map((msg) => (
                  <div key={msg.id} className={`${styles.message} ${msg.isUser ? styles.textOnly : ''}`}>
                    {!msg.isUser && (
                      <div className={styles.photo} style={{ backgroundImage: `url(${msg.userImage})` }}>
                        {msg.isOnline && <div className={styles.online}></div>}
                      </div>
                    )}
                    <p className={styles.text}>{msg.message}</p>
                    {msg.isUser && <p className={styles.responseTime}> {msg.date}</p>}
                  </div>
                ))}
            </div> */}

            

            {/* New Message Form for Responding to Messages */}
            {selectedUser && (
              <NewMessageForm 
              onSendMessage={handleSendMessage} 
              selectedUser={selectedUser}
              filteredMessages={filteredMessages}  />
            )}
          </section>
        
    </div>
    </MainContent>
  );
};

export default ChatPage;
