package com.project.project.entities.photo;

import jakarta.persistence.*;

@Entity
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Автоматическая генерация ID
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "photo_data", nullable = false, length = 255)
    private String photoData;

}
