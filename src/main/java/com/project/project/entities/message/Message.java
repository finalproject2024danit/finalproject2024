package com.project.project.entities.message;

import com.project.project.AbstractEntity;
import com.project.project.entities.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PRIVATE;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "messages")
@FieldDefaults(level = PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
public class Message extends AbstractEntity {

    @ManyToOne
    @JoinColumn(name = "user_from_id", nullable = false)
    User userFrom;

    @ManyToOne
    @JoinColumn(name = "user_to_id", nullable = false)    User userTo;

    @Column(name = "content", nullable = false)
    String content;

    @Column(name = "is_read", nullable = false)
    Boolean isRead;

    @Column(name = "message_time", nullable = false)
    LocalDateTime messageTime;
}
