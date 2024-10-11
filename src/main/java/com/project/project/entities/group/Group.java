package com.project.project.entities.group;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "post_id", nullable = false)
    private Long postId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    private LocalDate date;
}
