package com.project.project.entities.workplace;

import com.project.project.AbstractEntity;
import com.project.project.entities.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Set;

import static lombok.AccessLevel.PRIVATE;


@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "workplaces")
@FieldDefaults(level = PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
public class Workplace extends AbstractEntity {

    @Column
    String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "workplace_id")
    Set<User> users;

}