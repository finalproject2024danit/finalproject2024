package com.project.project.entities.workplace.service;

import com.project.project.entities.workplace.Workplace;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkplaceService {
    Workplace addWorkplace(Workplace workplace);

    Workplace getWorkplaceById(long id);

    List<Workplace> getAllWorkplaces();

}
