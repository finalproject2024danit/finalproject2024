import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import styles from "./NewMessageForm.module.scss";

const NewMessageForm = ({ userFrom, userTo, onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Очистка ID пользователя от префикса (если нужно)
  const getCleanUserId = (userId) => {
    return String(userId).replace("user-", ""); // Преобразуем в строку и убираем 'user-' из ID
  };

  // Получение сообщений между двумя пользователями
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoadingMessages(true);
        const cleanUserToId = getCleanUserId(userTo); // Очистить ID пользователя
        const cleanUserFromId = getCleanUserId(userFrom); // Очистить ID текущего пользователя

        console.log(`Fetching messages between ${cleanUserFromId} and ${cleanUserToId}`);
        const response = await fetch(
          `/api/v1/messages/between/${cleanUserFromId}/${cleanUserToId}`
        );
        console.log("Ответ от сервера на получение сообщений:", response.status, response.statusText);

        const data = await response.json();
        console.log("Полученные сообщения:", data); // Вывод загруженных сообщений
        if (data && Array.isArray(data)) {
          setMessages(data);
        }
      } catch (error) {
        console.error("Ошибка при получении сообщений:", error);
      } finally {
        setLoadingMessages(false);
      }
    };

    if (userFrom && userTo) {
      fetchMessages();
    }
  }, [userFrom, userTo]);

  // Отправка нового сообщения через HTTP POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация перед отправкой
    if (message.trim() === "") {
      alert("Сообщение не может быть пустым.");
      return;
    }

    const cleanUserToId = getCleanUserId(userTo); // Очистить ID собеседника
    const cleanUserFromId = getCleanUserId(userFrom); // Очистить ID отправителя

    const messageData = {
      content: message,
      userFrom: cleanUserFromId, // Чистый ID текущего пользователя
      userTo: cleanUserToId, // Чистый ID собеседника
    };

    console.log("Отправляем сообщение:", messageData); // Лог отправляемых данных

    try {
      const response = await fetch("/api/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      console.log("Ответ от сервера на отправку сообщения:", response.status, response.statusText);

      if (response.ok) {
        const sentMessage = await response.json();
        console.log("Сообщение отправлено:", sentMessage); // Лог успешного сообщения
        setMessages((prevMessages) => [...prevMessages, sentMessage]); // Обновляем список сообщений
        onSendMessage(sentMessage); // Вызываем родительскую функцию
        setMessage(""); // Очистить поле ввода
      } else {
        const errorData = await response.json();
        console.error("Ошибка при отправке сообщения:", errorData);
        alert(`Ошибка при отправке сообщения: ${errorData.message || "Неизвестная ошибка"}`);
      }
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  return (
    <div>
      <div>
        <h3>Сообщения между {userFrom} и {userTo}</h3>
        {loadingMessages ? (
          <p>Загрузка сообщений...</p>
        ) : messages.length > 0 ? (
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

// PropTypes для компонента
NewMessageForm.propTypes = {
  userFrom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Идентификатор пользователя-отправителя
  userTo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Идентификатор собеседника
  onSendMessage: PropTypes.func.isRequired, // Функция, вызываемая при отправке сообщения
};

export default NewMessageForm;
