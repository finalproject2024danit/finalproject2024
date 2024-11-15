package com.project.project.entities.message.service;

import com.project.project.entities.message.Message;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageService {
    Message saveMessage(Message message);

    Message getMessageById(long id);

    List<Message> getMessagesBetweenUsers(Long userFromId, Long userToId);

    List<List<Message>> getAllConversationsForUser(Long userId);
}
