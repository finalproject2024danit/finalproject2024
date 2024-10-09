package com.project.project.pet;

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
