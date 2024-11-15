package com.project.project.entities.message.db;

import com.project.project.entities.message.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m WHERE (m.userFrom.id = :userFromId AND m.userTo.id = :userToId) OR (m.userFrom.id = :userToId AND m.userTo.id = :userFromId)")
    List<Message> findMessagesBetweenUsers(@Param("userFromId") Long userFromId, @Param("userToId") Long userToId);

    @Query("SELECT m FROM Message m WHERE m.userFrom.id = :userId OR m.userTo.id = :userId ORDER BY m.messageTime ASC")
    List<Message> findAllMessagesForUser(@Param("userId") Long userId);
}
