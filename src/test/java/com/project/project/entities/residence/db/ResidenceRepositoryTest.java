package com.project.project.entities.residence.db;

import com.project.project.entities.residence.Residence;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback
class ResidenceRepositoryTest {

    @Autowired
    private ResidenceRepository residenceRepository;

    private Residence residence;

    @BeforeEach
    void setUp() {
        residence = new Residence();
        residence.setPlanet("Earth");
        residence.setCountry("Mongolia");
        residence.setCity("New York");
        residence.setCreatedDate(LocalDateTime.now());
        residence.setLastModifiedDate(LocalDateTime.now());
        residenceRepository.save(residence);
    }

    @Test
    void testFindByPlanetAndCountryAndCity_Found() {
        Optional<Residence> result = residenceRepository.findByPlanetAndCountryAndCity(
                "Earth", "Mongolia", "New York"
        );

        assertTrue(result.isPresent(), "Residence should be found");
        assertEquals(residence.getId(), result.get().getId(), "Returned residence ID should match");
        assertEquals("Earth", result.get().getPlanet(), "Planet should match");
        assertEquals("Mongolia", result.get().getCountry(), "Country should match");
        assertEquals("New York", result.get().getCity(), "City should match");
    }

    @Test
    void testFindByPlanetAndCountryAndCity_NotFound() {
        Optional<Residence> result = residenceRepository.findByPlanetAndCountryAndCity(
                "Mars", "Mongolia", "New York"
        );

        assertFalse(result.isPresent(), "Residence should not be found");
    }

    @Test
    void testSaveResidence() {
        Residence newResidence = new Residence();
        newResidence.setPlanet("Mars");
        newResidence.setCountry("Canada");
        newResidence.setCity("Toronto");
        newResidence.setCreatedDate(LocalDateTime.now());
        newResidence.setLastModifiedDate(LocalDateTime.now());

        Residence savedResidence = residenceRepository.save(newResidence);

        assertNotNull(savedResidence.getId(), "Saved residence should have an ID");
        assertEquals("Mars", savedResidence.getPlanet(), "Planet should match");
        assertEquals("Canada", savedResidence.getCountry(), "Country should match");
        assertEquals("Toronto", savedResidence.getCity(), "City should match");
    }

    @Test
    void testUpdateResidence() {
        residence.setCountry("Canada");
        residence.setCity("Toronto");

        Residence updatedResidence = residenceRepository.save(residence);

        assertEquals("Canada", updatedResidence.getCountry(), "Updated country should match");
        assertEquals("Toronto", updatedResidence.getCity(), "Updated city should match");
    }

    @Test
    void testDeleteResidence() {
        Long residenceId = residence.getId();
        residenceRepository.deleteById(residenceId);

        Optional<Residence> result = residenceRepository.findById(residenceId);
        assertFalse(result.isPresent(), "Residence should be deleted");
    }
}
