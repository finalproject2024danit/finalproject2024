package com.project.project.entities.message.service;

import com.project.project.entities.message.Message;
import com.project.project.entities.message.db.MessageRepository;
import com.project.project.entities.message.status.MessageStatus;
import com.project.project.exceptions.MessageNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    @Override
    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public Message getMessageById(long id) {
        return messageRepository.findById(id)
                .orElseThrow(() -> new MessageNotFoundException(MessageStatus.MESSAGE_NOT_FOUND.getMessage()));

    }

    @Override
    public List<Message> getMessagesBetweenUsers(Long userFromId, Long userToId) {
        return messageRepository.findMessagesBetweenUsers(userFromId, userToId);
    }

    @Override
    public List<List<Message>> getAllConversationsForUser(Long userId) {
        List<Message> messages = messageRepository.findAllMessagesForUser(userId);

        Map<String, List<Message>> groupedMessages = messages.stream()
                .collect(Collectors.groupingBy(message -> {
                    Long userFromId = message.getUserFrom().getId();
                    Long userToId = message.getUserTo().getId();
                    return userFromId < userToId ? userFromId + "-" + userToId : userToId + "-" + userFromId;
                }));

        return new ArrayList<>(groupedMessages.values());
    }
}
