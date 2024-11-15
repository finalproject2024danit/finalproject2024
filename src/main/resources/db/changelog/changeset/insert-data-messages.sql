INSERT INTO messages (user_from_id, user_to_id, content, is_read, message_time)
VALUES (1, 2, 'Have you seen the latest update on the space mission?', true, CURRENT_TIMESTAMP),
       (1, 2, 'Hello!', true, CURRENT_TIMESTAMP),
       (2, 1, 'Hi! How are you?', true, CURRENT_TIMESTAMP),
       (1, 2, 'I am good, thanks! What about you?', true, CURRENT_TIMESTAMP),
       (2, 1, 'I am doing well too, thank you!', true, CURRENT_TIMESTAMP),
       (1, 2, 'Glad to hear that! Let’s catch up soon.', true, CURRENT_TIMESTAMP),
       (1, 3, 'Hello!.', true, CURRENT_TIMESTAMP),
       (3, 4, 'I found an article about dark matter that might interest you. I will share it later.', true,
        CURRENT_TIMESTAMP),
       (5, 6, 'Dont forget about the upcoming conference on space exploration.', false, CURRENT_TIMESTAMP),
       (7, 8, 'Could you help me review the data we collected last week?', false, CURRENT_TIMESTAMP),
       (9, 10, 'We need to discuss the recent findings from the research project as soon as possible. It is crucial.',
        true, CURRENT_TIMESTAMP);
