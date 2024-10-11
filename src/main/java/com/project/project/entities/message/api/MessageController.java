package com.project.project.entities.message.api;

import com.project.project.entities.message.Message;
import com.project.project.entities.message.api.dto.RequestMessageDto;
import com.project.project.entities.message.api.dto.ResponseMessageDto;
import com.project.project.entities.message.service.MessageServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;


@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/messages")
public class MessageController {
    private final MessageServiceImpl messageService;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ResponseMessageDto sendMessage(RequestMessageDto requestMessageDto) {
        Message message = new Message();
        message.setContent(requestMessageDto.getContent());
        Message savedMessage = messageService.saveMessage(message);

        return new ResponseMessageDto(
                savedMessage.getUserFrom(),
                savedMessage.getContent()
        );
    }

    @GetMapping("/between/{userFromId}/{userToId}")
    public List<ResponseMessageDto> getMessagesBetweenUsers(@PathVariable Long userFromId, @PathVariable Long userToId) {
        List<Message> messages = messageService.getMessagesBetweenUsers(userFromId, userToId);
        return messages.stream()
                .map(message -> new ResponseMessageDto(
                        message.getUserFrom(),
                        message.getContent()
                ))
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseMessageDto getMessageById(@PathVariable Long id) {
        Message message = messageService.getMessageById(id);
        return new ResponseMessageDto(
                message.getUserFrom(),
                message.getContent()
        );
    }
}
