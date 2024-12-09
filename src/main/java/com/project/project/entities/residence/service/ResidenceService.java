package com.project.project.entities.residence.service;


import com.project.project.entities.residence.Residence;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ResidenceService {

    Residence getResidenceById(Long id);

    Residence updateResidence(Long id, String planet, String country, String city);

    Page<Residence> getAllResidences(Pageable pageable);

    Optional<Residence> getResidenceByPlanetCountryCity(String planet, String country, String city);

    Residence createResidenceIfNew(String planet, String country, String city);
}
