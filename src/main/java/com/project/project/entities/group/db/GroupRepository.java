package com.project.project.entities.group.db;

import com.project.project.entities.group.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Long>, JpaSpecificationExecutor<Group> {

    @Query(value = "SELECT * FROM groups WHERE name = :name", nativeQuery = true)
    Optional<Group> findByName(String name);

    @Query(value = "SELECT * FROM groups WHERE name ILIKE CONCAT('%', :name, '%')", nativeQuery = true)
    List<Group> findByNameContaining(String name);
}
