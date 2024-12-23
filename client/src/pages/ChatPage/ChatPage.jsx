import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import Select from "react-select";
import PropTypes from "prop-types";
import styles from "./ChatPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";
import { fetchSearchResults } from "../../redux/slices/searchSlice";
import { receivedMessage, selectUser } from "../../redux/slices/chatSlice";
import NewMessageForm from "./NewMessageForm/NewMessageForm";

const defaultAvatarProfile =
  "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_30,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1728939216/photo_2024-10-14_23-52-52_zg5tc7.jpg";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { results, isLoading } = useSelector((state) => state.globalsearch);
  const { messages, selectedUser } = useSelector((state) => state.chat);

  const [inputValue, setInputValue] = useState("");
  const [chatUsers, setChatUsers] = useState([]);
  const userFrom = 1;

  useEffect(() => {
    const savedUsers = localStorage.getItem("chatUsers");
    if (savedUsers) {
      setChatUsers(JSON.parse(savedUsers));
    }
  }, []);

  useEffect(() => {
    if (selectedUser) {
      console.log("Вибрано користувача зі списку:");
      console.log(
        `Ім'я користувача: ${selectedUser.name} (ID: ${selectedUser.id})`
      );
    }
  }, [selectedUser]);

  const saveMessagesToLocalStorage = (messages) => {
    localStorage.setItem("messages", JSON.stringify(messages));
  };

  const loadMessagesFromLocalStorage = () => {
    const savedMessages = localStorage.getItem("messages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  };

  const handleSendMessage = (messageText) => {
    if (selectedUser && userFrom) {
      const message = {
        content: messageText,
        userFrom: userFrom,
        userTo: selectedUser.id,
        messageTime: new Date().toISOString(),
      };

      if (message.content.trim()) {
        const updatedMessages = [...loadMessagesFromLocalStorage(), message];
        saveMessagesToLocalStorage(updatedMessages);

        dispatch(receivedMessage(message));

        console.log("Повідомлення надіслано:");
        console.log(
          `Надіслано користувачу: ${selectedUser.name} (ID: ${selectedUser.id})`
        );
        console.log(`Вміст повідомлення: ${message.content}`);
      } else {
        console.error("Повідомлення не може бути порожнім");
      }
    }
  };

  const handleUserSelect = (selectedOption, setFieldValue) => {
    if (selectedOption) {
      const user = {
        id: selectedOption.value,
        avatar:
          selectedOption.photoData ||
          selectedOption.avatar ||
          defaultAvatarProfile,
        name: selectedOption.label,
      };

      console.log("Вибраний користувач:");
      console.log(`Ім'я користувача: ${user.name} (ID: ${user.id})`);

      setChatUsers((prevUsers) => {
        const isUserAlreadyInList = prevUsers.some((u) => u.id === user.id);
        if (isUserAlreadyInList) return prevUsers;
        const updatedUsers = [...prevUsers, user];
        localStorage.setItem("chatUsers", JSON.stringify(updatedUsers));
        return updatedUsers;
      });

      dispatch(selectUser(user));

      setInputValue("");
      setFieldValue("search", "");
    }
  };

  const userOptions = results.filter((result) =>
    result.value.startsWith("user-")
  );

  return (
    <MainContent title="">
      <div className={styles.ChatBox}>
        <div className={styles.ChatSidebar}>
          <div className={styles.ChatSearch}>
            <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
              {({ setFieldValue }) => (
                <Form>
                  <Select
                    options={userOptions}
                    placeholder="Search for people"
                    className={styles.select}
                    isLoading={isLoading}
                    value={inputValue}
                    onInputChange={(inputValue) => {
                      setInputValue(inputValue);
                      dispatch(fetchSearchResults(inputValue));
                      setFieldValue("search", inputValue);
                    }}
                    onChange={(selectedOption) =>
                      handleUserSelect(selectedOption, setFieldValue)
                    }
                    isSearchable
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                  />
                </Form>
              )}
            </Formik>
          </div>
          <div className={styles.ChatUsersBox}>
            <div className={styles.ChatUsers}>
              {chatUsers.map((user) => (
                <div
                  key={user.id}
                  className={`${styles.ChatUser} ${
                    selectedUser?.id === user.id ? styles.selected : ""
                  }`}
                  onClick={() => {
                    dispatch(selectUser(user));
                    console.log("Вибрано користувача зі списку:");
                    console.log(
                      `Ім'я користувача: ${user.name} (ID: ${user.id})`
                    );
                  }}
                >
                  <img src={user.avatar} alt={`${user.name}'s avatar`} />
                  <span>{user.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.ChatMessage}>
          <div className={styles.Messages}>
            {messages
              .filter(
                (message) =>
                  (message.userTo === selectedUser?.id &&
                    message.userFrom === userFrom) ||
                  (message.userFrom === selectedUser?.id &&
                    message.userTo === userFrom)
              )
              .map((message, index) => (
                <div key={index} className={styles.Message}>
                  <span>
                    {message.userFrom === userFrom ? "You" : selectedUser?.name}
                  </span>
                  : {message.content}
                </div>
              ))}
          </div>

          <NewMessageForm
            userFrom={userFrom}
            userTo={selectedUser?.id}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </MainContent>
  );
};

ChatPage.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      photoData: PropTypes.object,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      userFrom: PropTypes.number.isRequired,
      userTo: PropTypes.number.isRequired,
      messageTime: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
};

export default ChatPage;
