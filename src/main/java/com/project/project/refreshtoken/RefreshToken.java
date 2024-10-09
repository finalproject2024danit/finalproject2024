package com.project.project.refreshtoken;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Генерация ID
    private Long id;

    private String name;

    private Boolean isValid;

    private Long userId;

    @Column(name = "date_time") // Настройка имени колонки
    private LocalDateTime dateTime;

}
