// import React from "react";
import MainContent from "../../components/MainContent/MainContent";
import styles from "./ChatPage.module.scss";

const ChatPage = () => {
  const messages = [
    {
      id: 1,
      user: "Lily Patel",
      date: "27.04.2023",
      message:
        "Agreed. In the meantime, let's keep pushing forward with this episode.",
      status: "Do not disturb",
    },
    {
      id: 2,
      user: "Adam Green",
      date: "Today",
      message:
        "Hey guys, I was thinking about some character ideas for our show.",
      status: "Online",
    },
    {
      id: 3,
      user: "Emily Liu",
      date: "Just now",
      message: "Well, we definitely need a strong leader character.",
      status: "Online",
    },
    {
      id: 4,
      user: "Marcus Chen",
      date: "Yesterday",
      message: "I love the new storyline direction!",
      status: "Offline",
    },
    {
      id: 5,
      user: "Lucas Ortiz",
      date: "2 hours ago",
      message: "The scene transitions need some improvement.",
      status: "Online",
    },
    {
      id: 6,
      user: "Lily Patel",
      date: "Just now",
      message: "We should discuss the theme music in our next meeting.",
      status: "Online",
    },
    {
      id: 7,
      user: "Olivia Sharma",
      date: "1 hour ago",
      message: "The latest episode draft looks fantastic!",
      status: "Online",
    },
    {
      id: 8,
      user: "David Singh",
      date: "2 days ago",
      message: "We might need to adjust the pacing of the script.",
      status: "Offline",
    },
    {
      id: 9,
      user: "Harper Singh",
      date: "Today",
      message: "Could we brainstorm more ideas for episode 5?",
      status: "Do not disturb",
    },
    {
      id: 10,
      user: "Isabella Rivera",
      date: "Just now",
      message: "Don’t forget to review the soundtrack selection.",
      status: "Online",
    },
    {
      id: 11,
      user: "Emily Liu",
      date: "Just now",
      message: "Well, we definitely need a strong leader character.",
      status: "Online",
    },
    {
      id: 12,
      user: "Adam Green",
      date: "Today",
      message: "Hey, any updates on the new character design?",
      status: "Online",
    },
    {
      id: 13,
      user: "Sophia Zhang",
      date: "Yesterday",
      message: "We could add more depth to the villain character.",
      status: "Do not disturb",
    },
  ];

  // Контент чату
  const chatContent = (
    <div className={styles.ChatPage}>
      {messages.map((msg) => (
        <div key={msg.id} className={styles.chatMessage}>
          <div className={styles.messageHeader}>
            <span className={styles.userName}>{msg.user}</span>
            <span className={styles.messageDate}>{msg.date}</span>
          </div>
          <p className={styles.messageText}>{msg.message}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.layout}>
      <div className={styles.mainContent}>
        {/* Правильний виклик MainContent */}
        <MainContent title="">
          {chatContent} {/* Вставка контенту чату як children */}
        </MainContent>
      </div>
    </div>
  );
};

export default ChatPage;

// // import React from "react";
// // import styles from './ChatPage.module.scss';
// // import MainContent from "../../components/MainContent/MainContent";
// // import MemberList from "../../components/MemberList/MemberList"; // Create this component for the right sidebar
// // import ChatFeed from "../../components/ChatFeed/ChatFeed"; // Create this component for the chat messages

// import MainContent from '../../components/MainContent/MainContent';
// import styles from './ChatPage.module.scss';

// const ChatPage = () => {
//   const onlineMessengers = ['Adam Green', 'David Singh', 'Harper Singh', 'Lily Patel'];
//   const offlineMessengers = ['Lucas Ortiz', 'Marcus Chen', 'Mia Park', 'Olivia Sharma', 'Sophia Zhang'];

//   // Компонент Messenger, який повертає JSX
//   const Messenger = () => {
//     return (

//       <div className={styles.messengerList}>
//         <div className={styles.onlineSection}>
//           <h3>Currently Online</h3>
//           <ul>
//             {onlineMessengers.map((messenger, index) => (
//               <li key={index} className={styles.online}>
//                 {messenger}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className={styles.offlineSection}>
//           <h3>Offline</h3>
//           <ul>
//             {offlineMessengers.map((messenger, index) => (
//               <li key={index} className={styles.offline}>
//                 {messenger}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     );
//   };

//   // Виклик функції Messenger як children в MainContent
//   return (
//     <div className={styles.mainContent}>
//       <MainContent title="Messenger Status">
//         {Messenger()} {/* Виклик функції Messenger */}
//       </MainContent>
//     </div>
//   );
// };

// export default ChatPage;

// const ChatPage = () => {

//   return (
//     <div className={styles.layout}>
//       {/* Left Sidebar if necessary */}
//       {/* <LeftSidebar /> */}

//       {/* Main Content Area */}
//       <div className={styles.mainContent}>
//         <MainContent title="Spaceship Crew">
//           <div className={styles.chatFeed}>
//           <ChatFeed />
//           </div>
//         </MainContent>
//       </div>

//       {/* Right Sidebar for Members */}
//       {/* <div className={styles.memberList}>
//         <MemberList />
//       </div> */}
//     </div>
//   );
// }

// export default ChatPage;
