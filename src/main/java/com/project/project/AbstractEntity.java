package com.project.project;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import static lombok.AccessLevel.PROTECTED;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@FieldDefaults(level = PROTECTED)
@Data
public abstract class AbstractEntity {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
}
