package com.project.project.entities.residence.service;

import com.project.project.entities.residence.Residence;
import com.project.project.entities.residence.db.ResidenceRepository;
import com.project.project.exceptions.ResidenceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResidenceServiceImpl implements ResidenceService {


    private final ResidenceRepository residenceRepository;

    @Override
    public Residence getResidenceById(Long id) {
        return residenceRepository.findById(id)
                .orElseThrow(() -> new ResidenceNotFoundException("Residence not found with id: " + id));
    }

    @Override
    public Residence updateResidence(Long id, String planet, String country, String city) {
        Residence residence = getResidenceById(id);

        if (planet != null) {
            residence.setPlanet(planet);
        }
        if (country != null) {
            residence.setCountry(country);
        }
        if (city != null) {
            residence.setCity(city);
        }

        return residenceRepository.save(residence);
    }

    @Override
    public Page<Residence> getAllResidences(Pageable pageable) {
        return residenceRepository.findAll(pageable);
    }

    @Override
    public Optional<Residence> getResidenceByPlanetCountryCity(String planet, String country, String city) {
        return residenceRepository.findByPlanetAndCountryAndCity(planet, country, city);
    }

    @Override
    public Residence createResidenceIfNew(String planet, String country, String city) {
        Optional<Residence> existingResidence = getResidenceByPlanetCountryCity(planet, country, city);

        if (existingResidence.isPresent()) {
            return existingResidence.get();
        }

        Residence newResidence = new Residence();
        newResidence.setPlanet(planet);
        newResidence.setCountry(country);
        newResidence.setCity(city);

        return residenceRepository.save(newResidence);
    }


}
