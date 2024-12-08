package com.project.project.entities.hobby.service;

import com.project.project.entities.hobby.Hobby;
import com.project.project.entities.hobby.db.HobbyRepository;
import com.project.project.entities.hobby.status.HobbyStatus;
import com.project.project.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
    public Hobby updateHobby(Long id, String language, String pet, String interest) {
        Hobby hobby = getHobbyById(id);

        if (language != null) {
            hobby.setLanguage(language);
        }
        if (pet != null) {
            hobby.setPet(pet);
        }
        if (interest != null) {
            hobby.setInterest(interest);
        }

        return hobbyRepository.save(hobby);
    }

    @Override
    public Optional<Hobby> getByLanguagePetInterest(String language, String pet, String interest) {
        return hobbyRepository.findByLanguageAndPetAndInterest(language, pet, interest);
    }

    @Override
    public Hobby createHobbyIfNew(String language, String pet, String interest) {
        Optional<Hobby> existingHobby = getByLanguagePetInterest(language, pet, interest);

        if (existingHobby.isPresent()) {
            return existingHobby.get();
        }

        Hobby newHobby = new Hobby();
        newHobby.setLanguage(language);
        newHobby.setPet(pet);
        newHobby.setInterest(interest);

        return hobbyRepository.save(newHobby);

    }
}
