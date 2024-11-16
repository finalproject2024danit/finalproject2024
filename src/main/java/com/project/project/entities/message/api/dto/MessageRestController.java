package com.project.project.entities.message.api.dto;

import com.project.project.entities.message.Message;
import com.project.project.entities.message.service.MessageServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/v1/messages")
public class MessageRestController {
    private final MessageServiceImpl messageService;

    @GetMapping("/between/{userFromId}/{userToId}")
    public List<ResponseMessageDto> getMessagesBetweenUsers(@PathVariable Long userFromId, @PathVariable Long userToId) {
        List<Message> messages = messageService.getMessagesBetweenUsers(userFromId, userToId);
        return messages.stream()
                .map(message -> new ResponseMessageDto(
                        message.getUserFrom().getId(),
                        message.getContent()
                ))
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseMessageDto getMessageById(@PathVariable Long id) {
        log.info("Trying to get message by id");

        Message message = messageService.getMessageById(id);
        return new ResponseMessageDto(
                message.getUserFrom().getId(),
                message.getContent()
        );
    }

    @GetMapping("/conversations/{userId}")
    public List<ResponseConversationDto> getAllConversationsForUser(@PathVariable Long userId) {
        List<List<Message>> groupedMessages = messageService.getAllConversationsForUser(userId);

        return groupedMessages.stream()
                .map(messages -> {
                    Message firstMessage = messages.get(0);
                    Long user1Id = firstMessage.getUserFrom().getId();
                    Long user2Id = firstMessage.getUserTo().getId();

                    return MessageMapper.INSTANCE.messagesToResponseConversationDto(user1Id, user2Id, messages);
                })
                .collect(Collectors.toList());
    }
}
