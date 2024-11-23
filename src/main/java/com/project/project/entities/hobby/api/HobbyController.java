package com.project.project.entities.hobby.api;


import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.entities.hobby.Hobby;
import com.project.project.entities.hobby.api.dto.HobbyMapper;
import com.project.project.entities.hobby.api.dto.RequestHobbyDto;
import com.project.project.entities.hobby.api.dto.ResponseHobbyDto;
import com.project.project.entities.hobby.api.dto.View;
import com.project.project.entities.hobby.service.HobbyServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/api/v1/hobbies")
@RequiredArgsConstructor
public class HobbyController {
    private final HobbyServiceImpl hobbyService;

    @GetMapping("/{id}")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseHobbyDto> getHobbyById(@PathVariable Long id) {
        log.info("Trying to get hobby by id: {}", id);

        Hobby hobby = hobbyService.getHobbyById(id);

        ResponseHobbyDto responseHobbyDto = HobbyMapper.INSTANCE.hobbyToResponseHobbyDto(hobby);

        return ResponseEntity.ok(responseHobbyDto);
    }

    @PatchMapping("/update/{id}")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseHobbyDto> updateHobby(@PathVariable Long id, @RequestBody RequestHobbyDto requestHobbyDto) {
        log.info("Trying to update hobby by id: {}", id);

        Hobby hobby = hobbyService.
                updateHobby(id, requestHobbyDto.getLanguage(), requestHobbyDto.getPet(), requestHobbyDto.getInterest());

        ResponseHobbyDto responseHobbyDto = HobbyMapper.INSTANCE.hobbyToResponseHobbyDto(hobby);

        return ResponseEntity.ok(responseHobbyDto);
    }
}