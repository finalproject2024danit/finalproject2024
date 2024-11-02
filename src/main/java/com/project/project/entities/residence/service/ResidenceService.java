package com.project.project.entities.residence.service;


import com.project.project.entities.residence.Residence;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ResidenceService {

    Residence getResidenceById(Long id);

    Residence updateResidence(Long id, String planet, String country, String city);

    Page<Residence> getAllResidences(Pageable pageable);
}
