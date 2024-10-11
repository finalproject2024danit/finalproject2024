package com.project.project.entities.language;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Language {
    @Id
    private Long id;

    @Id
    private Long userId;

    @Column(name = "language", length = 20, nullable = false)
    private String language;

}
