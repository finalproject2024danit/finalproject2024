package com.project.project.entities.longerest;

import jakarta.persistence.*;

@Entity
public class Longerest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(name = "language", length = 20, nullable = false)
    private String language;
}
