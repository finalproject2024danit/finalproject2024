import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./NewMessageForm.module.scss";
import PropTypes from "prop-types";

const NewMessageForm = ({ onSendMessage, selectedUser, filteredMessages }) => {
  const initialValues = {
    message: "",
  };

  const validationSchema = Yup.object({
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newMessage = {
      id: Date.now(),
      user: selectedUser,
      message: values.message,
      date: "Just now",
      status: "Online",
      isUser: true, // Assuming the message is from the current user
      userImage: selectedUser.image, // Assuming selectedUser has an image property
      isOnline: selectedUser.isOnline,
    };

    onSendMessage(newMessage);
    resetForm();
  };

  return (
    <div>
      <div className={styles.messagesChat}>
        {filteredMessages.map((msg, index) => {
          // Assign a unique id dynamically if it's missing
          const messageWithId = msg.id
            ? msg
            : { ...msg, id: Date.now() + index }; // Create a new object if id is missing

          console.log("Message ID:", messageWithId.id); // Log the message ID
          return (
            <div
              key={messageWithId.id}
              className={`${styles.message} ${
                messageWithId.isUser ? styles.textOnly : ""
              }`}
            >
              {!messageWithId.isUser && (
                <div
                  className={styles.photo}
                  style={{ backgroundImage: `url(${messageWithId.userImage})` }}
                >
                  {messageWithId.isOnline && (
                    <div className={styles.online}></div>
                  )}
                </div>
              )}
              <p className={styles.text}>
                {messageWithId.message || "No content available"}
              </p>
              {messageWithId.isUser && (
                <p className={styles.responseTime}> {messageWithId.date}</p>
              )}
            </div>
          );
        })}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <Field
              name="message"
              as="textarea"
              placeholder="Type your message..."
            />
            <ErrorMessage
              name="message"
              component="div"
              className={styles.error}
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            &#8593;{/* Upward arrow */}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default NewMessageForm;

NewMessageForm.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  selectedUser: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    isOnline: PropTypes.bool,
  }).isRequired,
  filteredMessages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.object, // Adjust as per user object structure
      message: PropTypes.string,
      date: PropTypes.string,
      status: PropTypes.string,
      isUser: PropTypes.bool,
      userImage: PropTypes.string,
      isOnline: PropTypes.bool,
    })
  ).isRequired,
};
