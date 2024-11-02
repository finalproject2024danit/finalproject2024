package com.project.project.entities.hobby.service;

import com.project.project.entities.hobby.Hobby;
import org.springframework.stereotype.Repository;

@Repository
public interface HobbyService {
    Hobby getHobbyById(Long id);

    Hobby updateHobbyLanguage(Long id, String language);

    Hobby updateHobbyPet(Long id, String pet);

    Hobby updateHobbyInterest(Long id, String interest);
}
