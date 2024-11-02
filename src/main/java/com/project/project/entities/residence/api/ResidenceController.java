package com.project.project.entities.residence.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.entities.residence.Residence;
import com.project.project.entities.residence.api.dto.RequestResidenceDto;
import com.project.project.entities.residence.api.dto.ResidenceMapper;
import com.project.project.entities.residence.api.dto.ResponseResidenceDto;
import com.project.project.entities.residence.api.dto.View;
import com.project.project.entities.residence.service.ResidenceServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequestMapping("/api/v1/residences")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001",
}, allowedHeaders = "*")
@RequiredArgsConstructor
public class ResidenceController {
    private final ResidenceServiceImpl residenceService;

    @GetMapping("/{id}")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseResidenceDto> getResidenceById(@PathVariable Long id) {
        log.info("Trying to get residence by id: {}", id);

        Residence residence = residenceService.getResidenceById(id);

        ResponseResidenceDto responseResidenceDto = ResidenceMapper.INSTANCE.residenceToResponseResidenceDto(residence);

        return ResponseEntity.ok(responseResidenceDto);
    }

    @PatchMapping("/update/{id}")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseResidenceDto> updateResidence(
            @PathVariable Long id,
            @RequestBody RequestResidenceDto requestResidenceDto) {
        log.info("Trying to update residence by id: {}", id);

        Residence residence = residenceService.updateResidence(
                id,
                requestResidenceDto.getPlanet(),
                requestResidenceDto.getCountry(),
                requestResidenceDto.getCity()
        );

        ResponseResidenceDto responseResidenceDto = ResidenceMapper.INSTANCE.residenceToResponseResidenceDto(residence);

        return ResponseEntity.ok(responseResidenceDto);
    }

    @GetMapping("/filter")
    @JsonView(View.Admin.class)
    public ResponseEntity<List<ResponseResidenceDto>> getAllResidences(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("Fetching all residences, page: {}, size: {}", page, size);

        Pageable pageable = PageRequest.of(page, size);
        Page<Residence> residencePage = residenceService.getAllResidences(pageable);

        List<ResponseResidenceDto> responseResidencesDto = residencePage.getContent()
                .stream()
                .map(ResidenceMapper.INSTANCE::residenceToResponseResidenceDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responseResidencesDto);
    }
}
