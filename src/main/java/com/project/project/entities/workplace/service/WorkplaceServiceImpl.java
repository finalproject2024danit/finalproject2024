package com.project.project.entities.workplace.service;

import com.project.project.entities.user.db.UserRepository;
import com.project.project.entities.user.status.UserStatus;
import com.project.project.entities.workplace.Workplace;
import com.project.project.entities.workplace.db.WorkplaceRepository;
import com.project.project.entities.workplace.status.WorkplaceStatus;
import com.project.project.exceptions.UserNotFoundException;
import com.project.project.exceptions.WorkplaceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkplaceServiceImpl implements WorkplaceService {

    private final WorkplaceRepository workplaceRepository;
    private final UserRepository userRepository;

    @Override
    public Workplace addWorkplace(String name) {
        Workplace workplace = new Workplace(name, new HashSet<>());
        return workplaceRepository.save(workplace);
    }

    @Override
    public Workplace getWorkplaceById(long id) {
        return workplaceRepository.findById(id)
                .orElseThrow(() -> new WorkplaceNotFoundException(WorkplaceStatus.WORKPLACE_NOT_FOUND.getMessage()));
    }

    @Override
    public List<Workplace> getAllWorkplaces() {
        return workplaceRepository.findAll();
    }

    @Override
    public Workplace updateWorkplace(long userId, long id, String name) {
        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(UserStatus.USER_NOT_FOUND.getMessage()));

        Workplace currentWorkplace = workplaceRepository.findById(id)
                .orElseThrow(() -> new WorkplaceNotFoundException(WorkplaceStatus.WORKPLACE_NOT_FOUND.getMessage()));
        if (currentWorkplace.getName().equals(name)) {
            throw new WorkplaceNotFoundException(WorkplaceStatus.NOTHING_TO_UPDATE.getMessage());
        }
        currentWorkplace.setName(name);
        return workplaceRepository.save(currentWorkplace);
    }

    @Override
    public Workplace getWorkplaceByName(String name) {
        return workplaceRepository.findByName(name)
                .orElseThrow(() -> new WorkplaceNotFoundException(WorkplaceStatus.WORKPLACE_NOT_FOUND.getMessage()));
    }


}
