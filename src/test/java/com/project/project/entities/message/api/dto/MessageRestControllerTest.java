package com.project.project.entities.message.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.project.entities.message.Message;
import com.project.project.entities.message.api.dto.MessageRestController;
import com.project.project.entities.message.api.dto.ResponseConversationDto;
import com.project.project.entities.message.api.dto.ResponseMessageDto;
import com.project.project.entities.message.api.dto.ResponseMessageForConversationDto;
import com.project.project.entities.message.service.MessageServiceImpl;
import com.project.project.entities.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class MessageRestControllerTest {

    private MockMvc mockMvc;

    @Mock
    private MessageServiceImpl messageService;

    @InjectMocks
    private MessageRestController messageRestController;

    private Message message;
    private ResponseMessageDto responseMessageDto;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(messageRestController).build();

        User user1 = new User();
        user1.setId(1000L);
        User user2 = new User();
        user2.setId(2000L);

        message = new Message();
        message.setId(1L);
        message.setUserFrom(user1);
        message.setUserTo(user2);
        message.setContent("Hello!");

        responseMessageDto = new ResponseMessageDto(1L, "Hello!");
    }

    @Test
    void getMessageById() throws Exception {
        when(messageService.getMessageById(1L)).thenReturn(message);

        mockMvc.perform(get("/api/v1/messages/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userFromId").value(1000L))
                .andExpect(jsonPath("$.content").value("Hello!"));

        verify(messageService, times(1)).getMessageById(1L);
    }

    @Test
    void getMessagesBetweenUsers() throws Exception {
        List<Message> messages = Arrays.asList(message);
        when(messageService.getMessagesBetweenUsers(1000L, 2000L)).thenReturn(messages);

        mockMvc.perform(get("/api/v1/messages/between/{userFromId}/{userToId}", 1000L, 2000L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].userFromId").value(1000L))
                .andExpect(jsonPath("$[0].content").value("Hello!"));

        verify(messageService, times(1)).getMessagesBetweenUsers(1000L, 2000L);
    }

    @Test
    void getAllConversationsForUser() throws Exception {
        when(messageService.getAllConversationsForUser(1000L)).thenReturn(Arrays.asList(Arrays.asList(message)));

        mockMvc.perform(get("/api/v1/messages/conversations/{userId}", 1000L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].userFromId").value(1000L))
                .andExpect(jsonPath("$[0].userToId").value(2000L))
                .andExpect(jsonPath("$[0].messages[0].userFromId").value(1000L))
                .andExpect(jsonPath("$[0].messages[0].content").value("Hello!"));

        verify(messageService, times(1)).getAllConversationsForUser(1000L);
    }
}
