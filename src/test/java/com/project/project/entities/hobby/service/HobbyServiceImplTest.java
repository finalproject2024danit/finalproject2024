package com.project.project.entities.hobby.service;

import com.project.project.entities.hobby.Hobby;
import com.project.project.entities.hobby.db.HobbyRepository;
import com.project.project.entities.hobby.status.HobbyStatus;
import com.project.project.exceptions.UserNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class HobbyServiceImplTest {

    @Mock
    private HobbyRepository hobbyRepository;

    @InjectMocks
    private HobbyServiceImpl hobbyService;

    private Hobby hobby;

    @BeforeEach
    public void setUp() {
        hobby = new Hobby();
        hobby.setId(1L);
        hobby.setLanguage("English");
        hobby.setPet("Dog");
        hobby.setInterest("Football");
    }

    @Test
    public void getHobbyById_Success() {
        when(hobbyRepository.findById(1L)).thenReturn(Optional.of(hobby));

        Hobby result = hobbyService.getHobbyById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("English", result.getLanguage());
        verify(hobbyRepository, times(1)).findById(1L);
    }

    @Test
    public void getHobbyById_HobbyNotFound() {
        when(hobbyRepository.findById(1L)).thenReturn(Optional.empty());

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            hobbyService.getHobbyById(1L);
        });

        assertEquals(HobbyStatus.HOBBY_NOT_FOUND.getMessage(), exception.getMessage());
        verify(hobbyRepository, times(1)).findById(1L);
    }

    @Test
    public void updateHobby_Success() {
        when(hobbyRepository.findById(1L)).thenReturn(Optional.of(hobby));
        when(hobbyRepository.save(hobby)).thenReturn(hobby);

        Hobby updatedHobby = hobbyService.updateHobby(1L, "Spanish", "Cat", "Chess");

        assertNotNull(updatedHobby);
        assertEquals("Spanish", updatedHobby.getLanguage());
        assertEquals("Cat", updatedHobby.getPet());
        assertEquals("Chess", updatedHobby.getInterest());
        verify(hobbyRepository, times(1)).findById(1L);
        verify(hobbyRepository, times(1)).save(hobby);
    }

    @Test
    public void updateHobby_HobbyNotFound() {
        when(hobbyRepository.findById(1L)).thenReturn(Optional.empty());

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            hobbyService.updateHobby(1L, "Spanish", "Cat", "Chess");
        });

        assertEquals(HobbyStatus.HOBBY_NOT_FOUND.getMessage(), exception.getMessage());
        verify(hobbyRepository, times(1)).findById(1L);
    }

    @Test
    public void createHobbyIfNew_HobbyExists() {
        when(hobbyRepository.findByLanguageAndPetAndInterest("English", "Dog", "Football")).thenReturn(Optional.of(hobby));

        Hobby result = hobbyService.createHobbyIfNew("English", "Dog", "Football");

        assertNotNull(result);
        assertEquals(hobby, result);
        verify(hobbyRepository, times(1)).findByLanguageAndPetAndInterest("English", "Dog", "Football");
        verify(hobbyRepository, times(0)).save(any(Hobby.class));
    }

    @Test
    public void createHobbyIfNew_NewHobby() {
        when(hobbyRepository.findByLanguageAndPetAndInterest("English", "Dog", "Football")).thenReturn(Optional.empty());
        when(hobbyRepository.save(any(Hobby.class))).thenReturn(hobby);

        Hobby result = hobbyService.createHobbyIfNew("English", "Dog", "Football");

        assertNotNull(result);
        assertEquals("English", result.getLanguage());
        assertEquals("Dog", result.getPet());
        assertEquals("Football", result.getInterest());
        verify(hobbyRepository, times(1)).findByLanguageAndPetAndInterest("English", "Dog", "Football");
        verify(hobbyRepository, times(1)).save(any(Hobby.class));
    }

    @Test
    public void getByLanguagePetInterest_Success() {
        when(hobbyRepository.findByLanguageAndPetAndInterest("English", "Dog", "Football")).thenReturn(Optional.of(hobby));

        Optional<Hobby> result = hobbyService.getByLanguagePetInterest("English", "Dog", "Football");

        assertTrue(result.isPresent());
        assertEquals(hobby, result.get());
        verify(hobbyRepository, times(1)).findByLanguageAndPetAndInterest("English", "Dog", "Football");
    }

    @Test
    public void getByLanguagePetInterest_NotFound() {
        when(hobbyRepository.findByLanguageAndPetAndInterest("English", "Dog", "Football")).thenReturn(Optional.empty());

        Optional<Hobby> result = hobbyService.getByLanguagePetInterest("English", "Dog", "Football");

        assertFalse(result.isPresent());
        verify(hobbyRepository, times(1)).findByLanguageAndPetAndInterest("English", "Dog", "Football");
    }
}
