package com.project.project.entities.hobby.db;

import com.project.project.entities.hobby.Hobby;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HobbyRepository extends JpaRepository<Hobby, Long> {
}
