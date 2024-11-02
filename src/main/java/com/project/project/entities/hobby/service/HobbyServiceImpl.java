package com.project.project.entities.hobby.service;

import com.project.project.entities.hobby.Hobby;
import com.project.project.entities.hobby.db.HobbyRepository;
import com.project.project.entities.hobby.status.HobbyStatus;
import com.project.project.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HobbyServiceImpl implements HobbyService {

    private final HobbyRepository hobbyRepository;


    @Override
    public Hobby getHobbyById(Long id) {
        return hobbyRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(HobbyStatus.HOBBY_NOT_FOUND.getMessage()));
    }

    @Override
    public Hobby updateHobbyLanguage(Long id, String language) {
        Hobby hobby = getHobbyById(id);
        hobby.setLanguage(language);
        return hobbyRepository.save(hobby);
    }

    @Override
    public Hobby updateHobbyPet(Long id, String pet) {
        Hobby hobby = getHobbyById(id);
        hobby.setPet(pet);
        return hobbyRepository.save(hobby);
    }

    @Override
    public Hobby updateHobbyInterest(Long id, String interest) {
        Hobby hobby = getHobbyById(id);
        hobby.setInterest(interest);
        return hobbyRepository.save(hobby);
    }
}
