package com.project.project.post;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity

public class Post {
    @Id
    private Long id;
    @Column(name = "user_id", nullable = false)
    private Long userId;
    @Column(nullable = false)
    private String content;
    private LocalDate dateTime;
}
