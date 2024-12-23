package com.project.project.entities.hobby.db;

import com.project.project.entities.hobby.Hobby;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@Transactional
@ActiveProfiles("local")
class HobbyRepositoryTest {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private HobbyRepository hobbyRepository;

    private Hobby hobby;

    @BeforeEach
    public void setUp() {
        hobby = new Hobby();
        hobby.setLanguage("English");
        hobby.setPet("Dog");
        hobby.setInterest("Running");
        entityManager.persist(hobby);
        entityManager.flush();
    }

    @Test
    void findByLanguageAndPetAndInterest() {
        String language = "English";
        String pet = "Dog";
        String interest = "Running";

        Optional<Hobby> result = hobbyRepository.findByLanguageAndPetAndInterest(language, pet, interest);

        assertTrue(result.isPresent());
        assertEquals(language, result.get().getLanguage());
        assertEquals(pet, result.get().getPet());
        assertEquals(interest, result.get().getInterest());
    }

    @Test
    void findByLanguageAndPetAndInterest_NoMatch() {
        String language = "French";
        String pet = "Cat";
        String interest = "Swimming";

        Optional<Hobby> result = hobbyRepository.findByLanguageAndPetAndInterest(language, pet, interest);

        assertFalse(result.isPresent());
    }

    @Test
    void saveHobby() {
        Hobby newHobby = new Hobby();
        newHobby.setLanguage("Spanish");
        newHobby.setPet("Fish");
        newHobby.setInterest("Fishing");

        hobbyRepository.save(newHobby);
        entityManager.flush();

        assertNotNull(newHobby.getId());
        Optional<Hobby> savedHobby = hobbyRepository.findById(newHobby.getId());
        assertTrue(savedHobby.isPresent());
        assertEquals("Spanish", savedHobby.get().getLanguage());
    }

    @Test
    void deleteHobby() {
        Long hobbyId = hobby.getId();
        assertNotNull(hobbyId);

        hobbyRepository.delete(hobby);
        entityManager.flush();

        assertFalse(hobbyRepository.findById(hobbyId).isPresent());
    }
}
