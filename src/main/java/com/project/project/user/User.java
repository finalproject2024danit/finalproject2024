package com.project.project.user;

import com.project.project.util.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@Entity

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull @Size(min = 3, max = 30, message = "Name most be add at 3 characters Long")
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    private String email;
    private Gender gender;
    private LocalDate date;
    private String avatar;
    @ElementCollection
    private Set<String> phones;
    @ElementCollection
    private List<String> photoData;
}

