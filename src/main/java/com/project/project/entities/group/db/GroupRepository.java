package com.project.project.entities.group.db;

import com.project.project.entities.group.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Long> {
}
