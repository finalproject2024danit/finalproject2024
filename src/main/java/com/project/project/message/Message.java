package com.project.project.message;

import jakarta.persistence.*;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_form_id", nullable = false)
    private Long userFormId;

    @Column(name = "user_to_id", nullable = false)
    private Long userToId;
}
