package com.project.project.entities.residence.service;

import com.project.project.entities.residence.db.ResidenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResidenceServiceImpl implements ResidenceService {


    private final ResidenceRepository residenceRepository;


}
