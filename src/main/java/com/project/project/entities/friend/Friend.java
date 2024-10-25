package com.project.project.entities.friend;

import com.project.project.AbstractEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import static lombok.AccessLevel.PRIVATE;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "friends")
@FieldDefaults(level = PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
public class Friend extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "user_from_id", nullable = false)
    Long userFromId;

    @Column(name = "user_to_id", nullable = false)
    Long userToId;
}
