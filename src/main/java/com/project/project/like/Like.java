package com.project.project.like;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "post_id", nullable = false)
    private Long postId;

    @Column(nullable = false)
    private LocalDate date;
}
