package com.project.project.phone;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Phone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(name = "phone", nullable = false, length = 255)
    private String phone;

}
