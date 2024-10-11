package com.project.project.entities.workplace.db;

import com.project.project.entities.workplace.Workplace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkplaceRepository extends JpaRepository<Workplace, Long> {
}
