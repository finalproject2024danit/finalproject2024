package com.project.project.entities.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.project.AbstractEntity;
import com.project.project.entities.group.Group;
import com.project.project.entities.hobby.Hobby;
import com.project.project.entities.residence.Residence;
import com.project.project.entities.workplace.Workplace;
import com.project.project.security.SysRole.SysRole;
import com.project.project.util.Gender;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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
    @Column(nullable = false)
    String firstName;

    @Column(nullable = false)
    String lastName;

    @Column(nullable = false)
    String email;

    @Column(nullable = false)
    String password;

    @Column
    @Enumerated(EnumType.STRING)
    Gender gender;

    @Column
    Long dateOfBirth;

    @Column
    String avatar;

    @Column
    String phones;

    @Column
    String photoData;

    @JsonBackReference
    @ManyToMany
    @JoinTable(
            name = "user_group",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id")
    )
    Set<Group> groups;

    @ManyToOne(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    }, fetch = FetchType.EAGER)
    @JsonIgnore
    @ToString.Exclude
    @JoinColumn(name = "workplace_id")
    Workplace workplace;

    @ManyToOne(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    }, fetch = FetchType.EAGER)
    @JsonIgnore
    @ToString.Exclude
    @JoinColumn(name = "residence_id")
    Residence residence;

    @ManyToOne(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    }, fetch = FetchType.EAGER)
    @JsonIgnore
    @ToString.Exclude
    @JoinColumn(name = "hobby_id")
    Hobby hobby;

    @Column(name = "enabled", length = 1, nullable = true)
    boolean enabled;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    List<SysRole> sysRoles = new ArrayList<>();

    @CreatedDate
    @Temporal(TIMESTAMP)
    @Column(name = "created_date", updatable = false, nullable = false)
    LocalDateTime createdDate;

    @LastModifiedDate
    @Temporal(TIMESTAMP)
    @Column(name = "last_modified_date", nullable = false)
    LocalDateTime lastModifiedDate;
}

