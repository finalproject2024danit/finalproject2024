// ChatFeed.js
import React from 'react';
import styles from './ChatFeed.module.scss';

const ChatFeed = () => {
  const messages = [
    { id: 1, user: 'Lily Patel', date: '27.04.2023', message: "Agreed. In the meantime, let's keep pushing forward with this episode.", status: 'Do not disturb' },
    { id: 2, user: 'Adam Green', date: 'Today', message: 'Hey guys, I was thinking about some character ideas for our show.', status: 'Online' },
    { id: 3, user: 'Emily Liu', date: 'Just now', message: 'Well, we definitely need a strong leader character.', status: 'Online' },
  ];

  return (
    <div className={styles.chatFeed}>
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
};

export default ChatFeed;
