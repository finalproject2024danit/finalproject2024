package com.project.project.entities.message.api;

import com.project.project.entities.message.Message;
import com.project.project.entities.message.api.dto.RequestMessageDto;
import com.project.project.entities.message.api.dto.ResponseMessageDto;
import com.project.project.entities.message.service.MessageServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequiredArgsConstructor
@Log4j2
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
                savedMessage.getUserFrom().getId(),
                savedMessage.getContent()
        );
    }
}
