package com.project.project.entities.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.project.AbstractEntity;
import com.project.project.entities.comment.Comment;
import com.project.project.entities.group.Group;
import com.project.project.entities.like.Like;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import static jakarta.persistence.TemporalType.TIMESTAMP;
import static lombok.AccessLevel.PRIVATE;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "posts")
@FieldDefaults(level = PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
public class Post extends AbstractEntity {

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String content;

    @JsonManagedReference
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Like> likes = new HashSet<>();

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @CreatedDate
    @Temporal(TIMESTAMP)
    @Column(name = "created_date", updatable = false, nullable = false)
    LocalDateTime createdDate;

    @LastModifiedDate
    @Temporal(TIMESTAMP)
    @Column(name = "last_modified_date", nullable = false)
    LocalDateTime lastModifiedDate;
}
