package com.project.project.entities.workplace.service;

import com.project.project.entities.workplace.Workplace;
import com.project.project.entities.workplace.db.WorkplaceRepository;
import com.project.project.entities.workplace.status.WorkplaceStatus;
import com.project.project.exceptions.WorkplaceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkplaceServiceImpl implements WorkplaceService {

    private final WorkplaceRepository workplaceRepository;

    @Override
    public Workplace addWorkplace(Workplace workplace) {
        return workplaceRepository.save(workplace);
    }

    @Override
    public Workplace getWorkplaceById(long id) {
        return workplaceRepository.findById(id)
                .orElseThrow(() -> new WorkplaceNotFoundException(WorkplaceStatus.WORKPLACE_NOT_FOUND.getMessage()));
    }
}
