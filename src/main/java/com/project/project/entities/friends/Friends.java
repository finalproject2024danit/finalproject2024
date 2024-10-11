package com.project.project.entities.friends;

import jakarta.persistence.*;

@Entity
public class Friends {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_from_id", nullable = false)
    private long userFromId;

    @Column(name = "user_to_id", nullable = false)
    private long userToId;
}
