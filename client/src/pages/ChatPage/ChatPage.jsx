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
    if (window.particlesJS) {
        window.particlesJS("particles-js", {
            particles: {
                number: {
                    value: 355,
                    density: {
                        enable: true,
                        value_area: 789.15,
                    },
                },
                color: {
                    value: "#ffffff",
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000",
                    },
                    polygon: {
                        nb_sides: 5,
                    },
                    image: {
                        src: "img/github.svg",
                        width: 100,
                        height: 100,
                    },
                },
                opacity: {
                    value: 0.49,
                    random: false,
                    anim: {
                        enable: true,
                        speed: 0.25,
                        opacity_min: 0,
                        sync: false,
                    },
                },
                size: {
                    value: 2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.333,
                        size_min: 0,
                        sync: false,
                    },
                },
                line_linked: {
                    enable: false,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 0.1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200,
                    },
                },
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "bubble",
                    },
                    onclick: {
                        enable: true,
                        mode: "push",
                    },
                    resize: true,
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1,
                        },
                    },
                    bubble: {
                        distance: 83.9,
                        size: 1,
                        duration: 3,
                        opacity: 1,
                        speed: 3,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                    push: {
                        particles_nb: 4,
                    },
                    remove: {
                        particles_nb: 2,
                    },
                },
            },
            retina_detect: true,
        }); // Close the particlesJS function call here
    }
}, [dispatch]); // This is where the useEffect closing brace goes

  
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
            <div  id="particles-js" className={styles.headerChat}>
              <i className={`fa fa-user-o ${styles.icon}`} aria-hidden="true"></i>
              {selectedUser && <p className={styles.name}>{selectedUser}</p>}
              <i className={`fa fa-ellipsis-h ${styles.icon} ${styles.clickable} ${styles.right}`} aria-hidden="true"></i>
            </div>
            
            {/* Messages History */}
            <div className={styles.messagesHistory}>
            {/* Render filtered messages here if needed */}
          </div>
           
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
