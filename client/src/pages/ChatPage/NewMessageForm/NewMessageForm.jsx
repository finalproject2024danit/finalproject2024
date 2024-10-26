import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './NewMessageForm.module.scss';

const NewMessageForm = ({ onSendMessage, selectedUser }) => {
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
    };

    onSendMessage(newMessage);
    resetForm();
  };

  return (
    <div>
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

export default NewMessageForm;
