package com.project.project.entities.hobby.service;

import com.project.project.entities.hobby.Hobby;

import java.util.Optional;

public interface HobbyService {
    Hobby getHobbyById(Long id);

    Hobby updateHobby(Long id, String language, String pet, String interest);

    Optional<Hobby> getByLanguagePetInterest(String language, String pet, String interest);

    Hobby createHobbyIfNew(String language, String pet, String interest);

}
