package com.project.project.entities.message.service;

import com.project.project.entities.message.Message;
import com.project.project.entities.message.db.MessageRepository;
import com.project.project.entities.message.status.MessageStatus;
import com.project.project.entities.user.User;
import com.project.project.exceptions.MessageNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MessageServiceImplTest {

    @Mock
    private MessageRepository messageRepository;

    @InjectMocks
    private MessageServiceImpl messageService;

    private Message message;
    private User user1;
    private User user2;

    @BeforeEach
    void setUp() {
        user1 = new User();
        user1.setId(1L);
        user1.setFirstName("Alice");

        user2 = new User();
        user2.setId(2L);
        user2.setFirstName("Bob");

        message = new Message();
        message.setId(1L);
        message.setUserFrom(user1);
        message.setUserTo(user2);
        message.setContent("Hello!");
        message.setIsRead(false);
        message.setMessageTime(LocalDateTime.now());
    }

    @Test
    void saveMessage() {
        when(messageRepository.save(message)).thenReturn(message);

        Message result = messageService.saveMessage(message);

        assertNotNull(result);
        assertEquals("Hello!", result.getContent());
        verify(messageRepository, times(1)).save(message);
    }

    @Test
    void getMessageById() {
        when(messageRepository.findById(1L)).thenReturn(Optional.of(message));

        Message result = messageService.getMessageById(1L);

        assertNotNull(result);
        assertEquals("Hello!", result.getContent());
        verify(messageRepository, times(1)).findById(1L);
    }

    @Test
    void getMessageById_NotFound() {
        when(messageRepository.findById(1L)).thenReturn(Optional.empty());

        MessageNotFoundException exception = assertThrows(MessageNotFoundException.class, () -> {
            messageService.getMessageById(1L);
        });

        assertEquals(MessageStatus.MESSAGE_NOT_FOUND.getMessage(), exception.getMessage());
        verify(messageRepository, times(1)).findById(1L);
    }

    @Test
    void getMessagesBetweenUsers() {
        List<Message> messages = Arrays.asList(message);
        when(messageRepository.findMessagesBetweenUsers(1L, 2L)).thenReturn(messages);

        List<Message> result = messageService.getMessagesBetweenUsers(1L, 2L);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Hello!", result.get(0).getContent());
        verify(messageRepository, times(1)).findMessagesBetweenUsers(1L, 2L);
    }

    @Test
    void getAllConversationsForUser() {
        Message message2 = new Message();
        message2.setId(2L);
        message2.setUserFrom(user2);
        message2.setUserTo(user1);
        message2.setContent("Hi Alice!");
        message2.setIsRead(false);
        message2.setMessageTime(LocalDateTime.now());

        when(messageRepository.findAllMessagesForUser(1L)).thenReturn(Arrays.asList(message, message2));

        List<List<Message>> result = messageService.getAllConversationsForUser(1L);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(2, result.get(0).size());
        verify(messageRepository, times(1)).findAllMessagesForUser(1L);
    }
}
