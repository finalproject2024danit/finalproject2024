import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './NewMessageForm.module.scss';
import PropTypes from "prop-types";

const NewMessageForm = ({ onSendMessage, selectedUser, filteredMessages }) => {
  const initialValues = {
    message: '',
  };

  const validationSchema = Yup.object({
    message: Yup.string().required('Message is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newMessage = {
      id: Date.now(),
      user: selectedUser,
      message: values.message,
      date: 'Just now',
      status: 'Online',
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
      </div>
      
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className={styles.form}>
        <div className={styles.formGroup}>
          <Field name="message" as="textarea" placeholder="Type your message..." />
          <ErrorMessage name="message" component="div" className={styles.error} />
        </div>
        <button type="submit" className={styles.submitBtn}>
          Send Message
        </button>
      </Form>
    </Formik>
    </div>
  );
};

NewMessageForm.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  selectedUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isOnline: PropTypes.bool.isRequired,
  }).isRequired,
  filteredMessages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NewMessageForm;
