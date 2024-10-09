package com.project.project.workplace;

import com.project.project.user.User;
import jakarta.persistence.*;

import java.util.List;


@Entity
public class Workplace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "workplace_id")
    private List<User> users;

    private String workLocation;

}

