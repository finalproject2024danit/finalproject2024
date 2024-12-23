package com.project.project.entities.message.db;

import com.project.project.entities.message.Message;
import com.project.project.entities.user.User;
import com.project.project.entities.user.db.UserRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@ActiveProfiles("local")
class MessageRepositoryTest {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EntityManager entityManager;

    private User user1;
    private User user2;
    private User user3;

    @BeforeEach
    void setUp() {
        user1 = new User();
        user1.setFirstName("Alice");
        user1.setLastName("Smith");
        user1.setEmail("alice.smith@example.com");
        user1.setPassword("password123");
        user1.setEnabled(true);
        user1.setCreatedDate(LocalDateTime.now());
        user1.setLastModifiedDate(LocalDateTime.now());
        userRepository.save(user1);

        user2 = new User();
        user2.setFirstName("Bob");
        user2.setLastName("Johnson");
        user2.setEmail("bob.johnson@example.com");
        user2.setPassword("password123");
        user2.setEnabled(true);
        user2.setCreatedDate(LocalDateTime.now());
        user2.setLastModifiedDate(LocalDateTime.now());
        userRepository.save(user2);

        user3 = new User();
        user3.setFirstName("Charlie");
        user3.setLastName("Brown");
        user3.setEmail("charlie.brown@example.com");
        user3.setPassword("password123");
        user3.setEnabled(true);
        user3.setCreatedDate(LocalDateTime.now());
        user3.setLastModifiedDate(LocalDateTime.now());
        userRepository.save(user3);

        Message message1 = new Message();
        message1.setUserFrom(user1);
        message1.setUserTo(user2);
        message1.setIsRead(false);
        message1.setContent("Hi Bob!");
        message1.setMessageTime(LocalDateTime.now());
        messageRepository.save(message1);

        Message message2 = new Message();
        message2.setUserFrom(user2);
        message2.setUserTo(user3);
        message2.setIsRead(false);
        message2.setContent("Hello Alice!");
        message2.setMessageTime(LocalDateTime.now());
        messageRepository.save(message2);

        Message message3 = new Message();
        message3.setUserFrom(user1);
        message3.setUserTo(user3);
        message3.setIsRead(false);
        message3.setContent("Hey Charlie!");
        message3.setMessageTime(LocalDateTime.now());
        messageRepository.save(message3);

        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void findMessagesBetweenUsers() {
        List<Message> messages = messageRepository.findMessagesBetweenUsers(user1.getId(), user2.getId());

        assertNotNull(messages);
        assertEquals(1, messages.size());

        assertTrue(messages.stream().anyMatch(m -> m.getUserFrom().getId().equals(user1.getId()) && m.getUserTo().getId().equals(user2.getId())));
    }

    @Test
    void findAllMessagesForUser() {
        List<Message> messagesForUser1 = messageRepository.findAllMessagesForUser(user1.getId());

        assertNotNull(messagesForUser1);
        assertEquals(2, messagesForUser1.size());

        assertTrue(messagesForUser1.stream().anyMatch(m -> m.getUserFrom().getId().equals(user1.getId()) && m.getUserTo().getId().equals(user2.getId())));
        assertTrue(messagesForUser1.stream().anyMatch(m -> m.getUserFrom().getId().equals(user1.getId()) && m.getUserTo().getId().equals(user3.getId())));
    }

    @Test
    void deleteMessage() {
        Message messageToDelete = messageRepository.findMessagesBetweenUsers(user1.getId(), user2.getId()).get(0);
        messageRepository.delete(messageToDelete);
        entityManager.flush();
        entityManager.clear();

        List<Message> remainingMessages = messageRepository.findMessagesBetweenUsers(user1.getId(), user2.getId());
        assertNotNull(remainingMessages);
        assertEquals(0, remainingMessages.size());
    }
}
