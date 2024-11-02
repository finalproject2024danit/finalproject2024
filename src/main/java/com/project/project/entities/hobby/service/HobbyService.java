package com.project.project.entities.hobby.service;

import com.project.project.entities.hobby.Hobby;
import org.springframework.stereotype.Repository;

@Repository
public interface HobbyService {
    Hobby getHobbyById(Long id);

    Hobby updateHobby(Long id, String language, String pet, String interest);

}
