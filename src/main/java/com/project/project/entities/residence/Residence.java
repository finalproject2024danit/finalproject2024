package com.project.project.entities.residence;

import com.project.project.entities.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;
@Entity
public class Residence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<User> users;

    @NotNull
    @Size(min = 3, max = 30, message = "Country name must be at least 3 characters long")
    private String country;

    @NotNull
    @Size(min = 3, max = 30, message = "City name must be at least 3 characters long")
    private String city;
}
