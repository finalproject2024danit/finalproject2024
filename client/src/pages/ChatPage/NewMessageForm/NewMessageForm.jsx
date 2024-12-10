
// import { useState, useEffect } from "react";
// import PropTypes from "prop-types"; // Import PropTypes
// import styles from "./NewMessageForm.module.scss";

// const NewMessageForm = ({ userFrom, userTo }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   // Имитируем загрузку сообщений при монтировании компонента
//   useEffect(() => {
//     const localMessages = JSON.parse(localStorage.getItem("messages")) || [];
//     setMessages(
//       localMessages.filter(
//         (msg) =>
//           (msg.userFrom === userFrom && msg.userTo === userTo) ||
//           (msg.userFrom === userTo && msg.userTo === userFrom)
//       )
//     );
//   }, [userFrom, userTo]);

//   // Функция для отправки сообщений (локальное сохранение)
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (message.trim() === "") {
//       alert("Сообщение не может быть пустым.");
//       return;
//     }

//     const newMessage = {
//       content: message.trim(),
//       userFrom,
//       userTo,
//       messageTime: new Date().toISOString(),
//     };

//     // Обновляем локальное хранилище
//     const allMessages = JSON.parse(localStorage.getItem("messages")) || [];
//     allMessages.push(newMessage);
//     localStorage.setItem("messages", JSON.stringify(allMessages));

//     // Обновляем локальный стейт
//     setMessages((prev) => [...prev, newMessage]);
//     setMessage(""); // Очищаем поле ввода
//   };

//   return (
//     <div>
//       <h3>Сообщения между {userFrom} и {userTo}</h3>
//       <div className={styles.messageList}>
//         {messages.length > 0 ? (
//           messages.map((msg, index) => (
//             <div key={index} className={styles.message}>
//               <p>{msg.content}</p>
//               <small>
//                 От: {msg.userFrom} Кому: {msg.userTo}
//               </small>
//               <small>Время: {new Date(msg.messageTime).toLocaleString()}</small>
//             </div>
//           ))
//         ) : (
//           <p>Нет сообщений между этими пользователями.</p>
//         )}
//       </div>
//       <form className={styles.NewMessageForm} onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Напишите сообщение..."
//         />
//         <button type="submit" disabled={!message.trim()}>
//           Отправить
//         </button>
//       </form>
//     </div>
//   );
// };

// // PropTypes для компонента
// NewMessageForm.propTypes = {
//   userFrom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   userTo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
// };

// export default NewMessageForm;


















import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import PropTypes from "prop-types";
import styles from "./NewMessageForm.module.scss";

const NewMessageForm = ({ userFrom, userTo, onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://134.209.246.21:9000/ws/chat", // Адрес WebSocket
      connectHeaders: {
        // Добавьте токен, если нужно
      },
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Подключено к WebSocket");

        client.subscribe("/topic/messages", (message) => {
          const body = JSON.parse(message.body);
          console.log("Получено сообщение:", body);
          setMessages((prev) => [...prev, body]);
        });
      },
      onStompError: (frame) => {
        console.error("Ошибка STOMP:", frame.headers["message"]);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Сообщение не может быть пустым.");
      return;
    }

    const newMessage = {
      userFrom,
      userTo,
      content: message,
    };

    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify(newMessage),
      });
      console.log("Отправлено сообщение:", newMessage);
    } else {
      console.error("WebSocket не подключен");
    }

    setMessage("");
  };

  return (
    <div>
      <div>
        <h3>Сообщения между {userFrom} и {userTo}</h3>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index}>
              <p>{msg.content}</p>
              <span>От: {msg.userFrom}</span>
              <span>Кому: {msg.userTo}</span>
            </div>
          ))
        ) : (
          <p>Нет сообщений между этими пользователями.</p>
        )}
      </div>
      <form className={styles.NewMessageForm} onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Напишите сообщение..."
        />
        <button type="submit" disabled={!message.trim()}>
          Отправить
        </button>
      </form>
    </div>
  );
};

NewMessageForm.propTypes = {
  userFrom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  userTo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSendMessage: PropTypes.func.isRequired,
};

export default NewMessageForm;
