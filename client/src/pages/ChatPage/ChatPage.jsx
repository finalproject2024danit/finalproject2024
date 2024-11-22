import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  selectUser,
  receivedMessage,
} from "../../redux/slices/chatSlice";
import { fetchConversations } from "../../redux/slices/conversationsSlice";
import NewMessageForm from "./NewMessageForm/NewMessageForm";
import MainContent from "../../components/MainContent/MainContent";
import styles from "./ChatPage.module.scss";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import axiosInstance from "../../api/axiosInstance.js";

const ChatPage = () => {
  const dispatch = useDispatch();

  const { messages, selectedUser, chatLoading } = useSelector(
    (state) => state.chat
  );
  const { conversations, loading: conversationsLoading } = useSelector(
    (state) => {
      console.log("Redux state:", state);
      return state.conversations || {}; // Avoid destructuring undefined
    }
  );
  // const { messages, selectedUser, chatLoading , talks} = useSelector((state) => state.chat);
  // const { currentUser } = useSelector((state) => state.auth); // Fetch `currentUser` from Redux
  const [currentUser] = useState({ id: 1 });
  const [searchTerm, setSearchTerm] = useState("");

  // , setCurrentUser я тут убрал эту переменную отсюда   const {currentUser, setCurrentUser} = useState({id: 1}); она нигде не используется и ругается lint

  const [wsClient, setWsClient] = useState(null);

  useEffect(() => {
    // Инициализация WebSocket соединения
    const socket = new SockJS("http://134.209.246.21:9000/ws", null, {
      withCredentials: false, // Do not include credentials - we face CORS issue runnning locally
    });
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("Connected to WebSocket");

      // Подписка на общую тему
      // client.subscribe("/topic/messages", (message) => {
      // console.log("WsClient received topic message", message);
      // dispatch(receivedTopicMessage(message));
      // });

      // Подписка на личные сообщения
      client.subscribe("/user/queue/reply", (message) => {
        console.log("Private message:", JSON.parse(message.body));
        dispatch(receivedMessage(message));
      });
    });

    setWsClient(client);

    return () => {
      if (client) {
        client.disconnect(() => {
          console.log("Disconnected from WebSocket");
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
    // Fetch conversations for the current user

    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUser) {
      dispatch(
        fetchMessages({
          userFrom: currentUser.id,
          userTo: selectedUser.id,
        })
      );
    }
  }, [selectedUser, dispatch]);

  // While we don't have usersSlice, just duplicating effect from UsersPage
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState([]);
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axiosInstance.get("/users/filter", {
          params: {
            startPage: 0,
            perPage: 100_000,
          },
        });
        console.log(response);

        const usersData = response.data || [];
        setUsers(usersData);
      } catch (err) {
        console.error(err);
      } finally {
        setUsersLoading(false);
      }
    };

    fetchAllUsers();
  }, [dispatch]);

  const handleConversationSelect = (user) => {
    dispatch(selectUser(user));
    console.log("user in handleUserSelect", user);
  };

  // const handleSendMessage = (message) => {
  // dispatch(sendMessage(message));
  // };

  const handleSendMessage = (newMessageContent) => {
    const newMessage = {
      content: newMessageContent,
      userFrom: currentUser.id,
      userTo: selectedUser.id,
    };
    wsClient.send("/chat", {}, JSON.stringify(newMessage));
  };

  // Filter talks based on searchTerm
  const filteredConversations = conversations.filter(
    (conv) => true
    //   conv.userToId.toLowerCase()
    // .includes(searchTerm.toLowerCase())
  );

  // find partner from conversation
  const findPartnerUser = (conv) => {
    const partner = users.find((user) => {
      const isMe = currentUser.id === user.id;
      const isParticipant =
        user.id === conv.userFromId || user.id === conv.userToId;
      return !isMe && isParticipant;
    });
    if (!partner) {
      console.error("No partner for conversation", conv, users);
      return undefined;
    }
    return {
      id: partner.id,
      name: `${partner.firstName} ${partner.lastName}`,
      photoData: partner.photoData,
    };
  };

  // find last message in conversation
  const findLastMessage = (conv) => {
    if (!conv.messages) {
      console.error("No messages for a last one", conv);
      return undefined;
    }
    const last = conv.messages.reduce(
      (last, msg) => (last.messageTime > msg.messageTime ? last : msg),
      conv.messages[0]
    );
    if (!last) {
      console.error(
        "Stupid error! How could we not find the last message?!",
        conv
      );
      return undefined;
    }
    return { text: last.content, time: last.messageTime };
  };

  const lastUserMessages =
    conversationsLoading || usersLoading
      ? []
      : filteredConversations
          .map((conv) => [findPartnerUser(conv), findLastMessage(conv)])
          .filter(([partner, message]) => !!partner && !!message)
          .map(([partner, message]) => ({
            userId: partner.id,
            userName: partner.name,
            userImage: partner.photoData,
            lastMessage: message.text,
            lastMessageDate: message.time,
          }));

  const filteredMessages = messages; /* .filter(
    (msg) => msg.userFrom === currentUser || msg.userTo === currentUser); */
  console.log("Filtered Messages:", filteredMessages);

  // const uniqueUsers = Array.from(
  //   new Set(messages.flatMap((msg) => [msg.userFrom, msg.userTo]))
  // ).filter((user) => user !== currentUser);

  return (
    <MainContent title="">
      <div className={styles.container}>
        {/* Conversations Section */}
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
          {conversationsLoading ? (
            <p>Loading...</p>
          ) : (
            lastUserMessages.map((lastUserMassage) => (
              <div
                key={lastUserMassage.userId}
                className={`${styles.discussion} ${
                  selectedUser?.userId === lastUserMassage.userId
                    ? styles.messageActive
                    : ""
                }`}
                onClick={() =>
                  handleConversationSelect(
                    {
                      id: lastUserMassage.userId,
                      userName: lastUserMassage.userName,
                    }, // <-- unneccessary
                    lastUserMassage.userId
                  )
                }
              >
                <div
                  className={styles.photo}
                  style={{
                    backgroundImage: `url(${lastUserMassage.userImage})`,
                  }}
                >
                  {lastUserMassage.isOnline && (
                    <div className={styles.online}></div>
                  )}
                </div>
                <div className={styles.descContact}>
                  <p className={styles.name}>{lastUserMassage.userName}</p>
                  <p className={styles.message}>
                    {lastUserMassage.lastMessage}
                  </p>
                </div>
                <div className={styles.timer}>
                  {new Date(
                    lastUserMassage.lastMessageDate
                  ).toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
        </section>

        {/* Chat Section */}
        <section className={styles.chat}>
          <div id="particles-js" className={styles.headerChat}>
            <i className={`fa fa-user-o ${styles.icon}`} aria-hidden="true"></i>
            {selectedUser && (
              <p className={styles.name}>
                {selectedUser.firstName} {selectedUser.lastName}
              </p>
            )}
            <i
              className={`fa fa-ellipsis-h ${styles.icon} ${styles.clickable} ${styles.right}`}
              aria-hidden="true"
            ></i>
          </div>

          {/* Messages History */}
          <div className={styles.messagesHistory}>
            {chatLoading ? (
              <p>Loading...</p>
            ) : (
              filteredMessages.map((msg) => (
                <div key={msg.id} className={styles.messageItem}>
                  <p>
                    <strong>
                      {msg.userFrom === currentUser
                        ? "You"
                        : selectedUser.firstName}
                      :
                    </strong>{" "}
                    {msg.content}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* New Message Form for Responding to Messages */}
          {selectedUser && (
            <NewMessageForm
              onSendMessage={handleSendMessage}
              selectedUser={selectedUser}
              filteredMessages={filteredMessages}
            />
          )}
        </section>
      </div>
    </MainContent>
  );
};

export default ChatPage;
