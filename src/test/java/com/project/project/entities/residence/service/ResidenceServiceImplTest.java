package com.project.project.entities.residence.service;

import com.project.project.entities.residence.Residence;
import com.project.project.entities.residence.db.ResidenceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ResidenceServiceImplTest {

    @Mock
    private ResidenceRepository residenceRepository;

    @InjectMocks
    private ResidenceServiceImpl residenceService;

    private Residence residence;

    @BeforeEach
    void setUp() {
        residence = new Residence();
        residence.setId(1L);
        residence.setPlanet("Earth");
        residence.setCountry("USA");
        residence.setCity("New York");
    }

    @Test
    void getResidenceById() {
        when(residenceRepository.findById(1L)).thenReturn(Optional.of(residence));

        Residence result = residenceService.getResidenceById(1L);

        assertNotNull(result);
        assertEquals("Earth", result.getPlanet());
        assertEquals("USA", result.getCountry());
        assertEquals("New York", result.getCity());
        verify(residenceRepository, times(1)).findById(1L);
    }

    @Test
    void updateResidence() {
        when(residenceRepository.findById(1L)).thenReturn(Optional.of(residence));
        when(residenceRepository.save(residence)).thenReturn(residence);

        Residence updatedResidence = residenceService.updateResidence(1L, "Mars", "Canada", "Toronto");

        assertEquals("Mars", updatedResidence.getPlanet());
        assertEquals("Canada", updatedResidence.getCountry());
        assertEquals("Toronto", updatedResidence.getCity());
        verify(residenceRepository, times(1)).save(residence);
    }

    @Test
    void getAllResidences() {
        PageRequest pageable = PageRequest.of(0, 2);
        Page<Residence> residencesPage = new PageImpl<>(List.of(residence), pageable, 1);
        when(residenceRepository.findAll(pageable)).thenReturn(residencesPage);

        Page<Residence> result = residenceService.getAllResidences(pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("Earth", result.getContent().get(0).getPlanet());
        verify(residenceRepository, times(1)).findAll(pageable);
    }

    @Test
    void getResidenceByPlanetCountryCity() {
        when(residenceRepository.findByPlanetAndCountryAndCity("Earth", "USA", "New York"))
                .thenReturn(Optional.of(residence));

        Optional<Residence> result = residenceService.getResidenceByPlanetCountryCity("Earth", "USA", "New York");

        assertTrue(result.isPresent());
        assertEquals("Earth", result.get().getPlanet());
        assertEquals("USA", result.get().getCountry());
        assertEquals("New York", result.get().getCity());
        verify(residenceRepository, times(1)).findByPlanetAndCountryAndCity("Earth", "USA", "New York");
    }

    @Test
    void createResidenceIfNew() {
        when(residenceRepository.findByPlanetAndCountryAndCity("Earth", "USA", "New York"))
                .thenReturn(Optional.empty());
        when(residenceRepository.save(any(Residence.class))).thenReturn(residence);

        Residence result = residenceService.createResidenceIfNew("Earth", "USA", "New York");

        assertNotNull(result);
        assertEquals("Earth", result.getPlanet());
        assertEquals("USA", result.getCountry());
        assertEquals("New York", result.getCity());
        verify(residenceRepository, times(1)).save(any(Residence.class));
    }
}