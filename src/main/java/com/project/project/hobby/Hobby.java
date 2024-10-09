package com.project.project.hobby;

import com.project.project.pet.Pet;
import com.project.project.util.Interests;
import com.project.project.util.Language;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Hobby {
    @Id @GeneratedValue
    private Long id;
    @ElementCollection
    private Set<Language> languages;
    @OneToOne
    private Pet pet;
    @ElementCollection
    private Set<Interests> interests;
}
