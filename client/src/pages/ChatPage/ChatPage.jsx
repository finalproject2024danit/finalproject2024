import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, selectUser, sendMessage, fetchTalks } from "../../redux/slices/chatSlice";
import NewMessageForm from "./NewMessageForm/NewMessageForm";
import MainContent from "../../components/MainContent/MainContent";
import styles from "./ChatPage.module.scss";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";



const ChatPage = () => {
  const dispatch = useDispatch();
  const { messages, selectedUser, loading , talks} = useSelector((state) => state.chat);
  const {currentUser} = useState({id: 1}); 
  const [searchTerm, setSearchTerm] = useState("");

  // , setCurrentUser я тут убрал эту переменную отсюда   const {currentUser, setCurrentUser} = useState({id: 1}); она нигде не используется и ругается lint

    useEffect(() => {
        // Инициализация WebSocket соединения
        const socket = new SockJS('http://localhost:9000/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            console.log('Connected to WebSocket');

            // Подписка на общую тему
            client.subscribe('/topic/messages', (message) => {
                console.log(message)
            });

            // Подписка на личные сообщения
            client.subscribe('/user/queue/reply', (message) => {
                console.log('Private message:', JSON.parse(message.body));
            });

        });

        return () => {
            if (client) {
                client.disconnect(() => {
                    console.log('Disconnected from WebSocket');
                });
            }
        };
    }, []);

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
  // Fetch talks when the component mounts
  dispatch(fetchTalks());
}, [dispatch]);  

useEffect(() => {
  if (selectedUser) {
      dispatch(fetchMessages({ userFrom: currentUser, userTo: selectedUser.id }));
  }
}, [selectedUser, dispatch]);

  const handleUserSelect = (user) => {
    dispatch(selectUser(user));
    console.log("user in handleUserSelect", user);
  };

  const handleSendMessage = (message) => {
    dispatch(sendMessage(message));
  };

  // const handleSendMessage = (newMessageContent) => {
  //   const newMessage = {
  //     content: newMessageContent,
  //     userFrom: currentUser,
  //     userTo: selectedUser.id,
  //   };
  //   websocket.send(JSON.stringify(newMessage)); // Replace 'websocket' with your actual WebSocket instance
  //   dispatch(sendMessage(newMessage));
  // };

    // Filter talks based on searchTerm
    const filteredTalks = talks.filter((talk) =>
      talk.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredMessages = messages.filter(
    (msg) => msg.userFrom === currentUser || msg.userTo === currentUser);
console.log('Filtered Messages:', filteredMessages);

// const uniqueUsers = Array.from(
//   new Set(messages.flatMap((msg) => [msg.userFrom, msg.userTo]))
// ).filter((user) => user !== currentUser);

  return (
    <MainContent title="Chat">
    <div className={styles.container}>
        
        {/* Discussions Section */}
        <section className={styles.discussions}>
          <div className={`${styles.discussion} ${styles.search}`}>
            <div className={styles.searchbar}>
              <i className="fa fa-search" aria-hidden="true"></i>
              <input 
              type="text" 
              placeholder="Search..." 
              onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Unique User List */}
          {loading ? (
          <p>Loading...</p>
        ) : (
          filteredTalks.map((talk) => {
            // Find the latest message with this user
            return (
              <div
                key={talk.id}
                className={`${styles.discussion} ${
                  talk.id === selectedUser?.id ? styles.messageActive : ''}`}
                onClick={() => handleUserSelect({ id: talk.id })}
              >
                <div 
                className={styles.photo} 
                style={{ backgroundImage: `url(${talk.userImage})` }}>
                  {talk.isOnline && <div className={styles.online}></div>}
                </div>
                <div className={styles.descContact}>
                  <p className={styles.name}>{talk.user}</p>
                  <p className={styles.message}>{talk.content}</p>
                </div>
                <div 
                className={styles.timer}>
                  {new Date(talk.date).toLocaleTimeString()}
                  </div>
              </div>
            );
          })
        )}
        </section>
        
        {/* Chat Section */}
        <section className={styles.chat}>
            <div id="particles-js"  className={styles.headerChat}>
              <i className={`fa fa-user-o ${styles.icon}`} aria-hidden="true"></i>
              {selectedUser && <p className={styles.name}>{selectedUser.firstName} {selectedUser.lastName}</p>}
              <i className={`fa fa-ellipsis-h ${styles.icon} ${styles.clickable} ${styles.right}`} aria-hidden="true"></i>
            </div>
            
            {/* Messages History */}
            <div className={styles.messagesHistory}>
            {filteredMessages.map((msg) => (
                            <div key={msg.id} className={styles.messageItem}>
                                <p>
                                  <strong>
                                    {msg.userFrom === currentUser ? "You" : selectedUser.firstName}:
                                    </strong> {msg.content}
                                    </p>
                            </div>
                        ))}
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
