package com.project.project.entities.pet;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Pet {
    @Id @GeneratedValue
    private Long id;
    private Long userId;
    private String pet;
}
