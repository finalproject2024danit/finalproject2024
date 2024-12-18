package com.project.project.entities.like;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.project.project.AbstractEntity;
import com.project.project.entities.comment.Comment;
import com.project.project.entities.post.Post;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

import static jakarta.persistence.TemporalType.TIMESTAMP;
import static lombok.AccessLevel.PRIVATE;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "likes")
@FieldDefaults(level = PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
public class Like extends AbstractEntity {

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "post_id", nullable = true)
    Post post;

    @ManyToOne
    @JoinColumn(name = "comment_id", nullable = true)
    Comment comment;

    @Column(name = "user_id", nullable = false)
    Long userId;

    @CreatedDate
    @Temporal(TIMESTAMP)
    @Column(name = "created_date", updatable = false, nullable = false)
    LocalDateTime createdDate;

    @LastModifiedDate
    @Temporal(TIMESTAMP)
    @Column(name = "last_modified_date", nullable = false)
    LocalDateTime lastModifiedDate;
}
