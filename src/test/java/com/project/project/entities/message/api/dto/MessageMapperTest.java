package com.project.project.entities.message.api.dto;

import com.project.project.entities.message.Message;
import com.project.project.entities.user.User;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class MessageMapperTest {

    private final MessageMapper messageMapper = MessageMapper.INSTANCE;

    @Test
    void messageToResponseMessageDto() {
        User userFrom = new User();
        userFrom.setId(1L);
        Message message = new Message();
        message.setUserFrom(userFrom);
        message.setContent("Test message content");
        message.setIsRead(true);
        message.setMessageTime(LocalDateTime.now());

        ResponseMessageDto responseMessageDto = messageMapper.messageToResponseMessageDto(message);

        assertNotNull(responseMessageDto);
        assertEquals(1L, responseMessageDto.getUserFromId());
        assertEquals("Test message content", responseMessageDto.getContent());
    }

    @Test
    void requestMessageDtoToMessage() {
        RequestMessageDto requestMessageDto = new RequestMessageDto();
        requestMessageDto.setContent("Test request message content");

        Message message = messageMapper.requestMessageDtoToMessage(requestMessageDto);

        assertNotNull(message);
        assertEquals("Test request message content", message.getContent());
    }

    @Test
    void messageToResponseMessageForConversationDto() {
        User userFrom = new User();
        userFrom.setId(1L);
        Message message = new Message();
        message.setUserFrom(userFrom);
        message.setContent("Test message content for conversation");
        message.setMessageTime(LocalDateTime.now());

        ResponseMessageForConversationDto responseMessageForConversationDto = messageMapper.messageToResponseMessageForConversationDto(message);

        assertNotNull(responseMessageForConversationDto);
        assertEquals(1L, responseMessageForConversationDto.getUserFromId());
        assertEquals("Test message content for conversation", responseMessageForConversationDto.getContent());
    }

    @Test
    void messagesToResponseConversationDto() {
        User user1 = new User();
        user1.setId(1L);
        User user2 = new User();
        user2.setId(2L);

        Message message1 = new Message();
        message1.setUserFrom(user1);
        message1.setUserTo(user2);
        message1.setContent("First message");
        message1.setMessageTime(LocalDateTime.now());

        Message message2 = new Message();
        message2.setUserFrom(user2);
        message2.setUserTo(user1);
        message2.setContent("Second message");
        message2.setMessageTime(LocalDateTime.now());

        ResponseConversationDto responseConversationDto = messageMapper.messagesToResponseConversationDto(1L, 2L, List.of(message1, message2));

        assertNotNull(responseConversationDto);
        assertEquals(1L, responseConversationDto.getUserFromId());
        assertEquals(2L, responseConversationDto.getUserToId());
        assertEquals(2, responseConversationDto.getMessages().size());
    }
}
