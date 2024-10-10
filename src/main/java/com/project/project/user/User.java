package com.project.project.user;

import com.project.project.AbstractEntity;
import com.project.project.util.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

import static jakarta.persistence.TemporalType.TIMESTAMP;
import static lombok.AccessLevel.PRIVATE;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "users")
@FieldDefaults(level = PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
public class User extends AbstractEntity {
    @NotNull
    String firstName;

    @NotNull
    String lastName;

    @NotNull
    String email;

    @NotNull
    String password;

    @Enumerated(EnumType.STRING)
    Gender gender;

    Long dateOfBirth;

    String avatar;

    String phones;

    String photoData;

    @CreatedDate
    @Temporal(TIMESTAMP)
    @Column(name = "created_date", updatable = false, nullable = false)
    LocalDateTime createdDate;

    @LastModifiedDate
    @Temporal(TIMESTAMP)
    @Column(name = "last_modified_date", nullable = false)
    LocalDateTime lastModifiedDate;
}

