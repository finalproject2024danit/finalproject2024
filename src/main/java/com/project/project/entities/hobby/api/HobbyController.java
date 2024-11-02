package com.project.project.entities.hobby.api;


import com.project.project.entities.hobby.Hobby;
import com.project.project.entities.hobby.api.dto.HobbyMapper;
import com.project.project.entities.hobby.api.dto.ResponseHobbyDto;
import com.project.project.entities.hobby.service.HobbyServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/api/v1/hobbies")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001",
}, allowedHeaders = "*")
@RequiredArgsConstructor
public class HobbyController {
    private final HobbyServiceImpl hobbyService;

    @GetMapping("/{id}")
    public ResponseEntity<ResponseHobbyDto> getHobbyById(@PathVariable Long id) {
        log.info("Trying to get hobby by id: {}", id);

        Hobby hobby = hobbyService.getHobbyById(id);

        ResponseHobbyDto responseHobbyDto = HobbyMapper.INSTANCE.hobbyToResponseHobbyDto(hobby);

        return ResponseEntity.ok(responseHobbyDto);
    }

    @PatchMapping("/{id}/language")
    public ResponseEntity<ResponseHobbyDto> updateHobbyLanguage(@PathVariable Long id, @RequestBody String language) {
        log.info("Trying to patch hobby language by id: {}", id);

        Hobby hobby = hobbyService.updateHobbyLanguage(id, language);

        ResponseHobbyDto responseHobbyDto = HobbyMapper.INSTANCE.hobbyToResponseHobbyDto(hobby);

        return ResponseEntity.ok(responseHobbyDto);
    }

    @PatchMapping("/{id}/pet")
    public ResponseEntity<ResponseHobbyDto> updateHobbyPet(@PathVariable Long id, @RequestBody String pet) {
        log.info("Trying to patch hobby pet by id: {}", id);

        Hobby hobby = hobbyService.updateHobbyPet(id, pet);

        ResponseHobbyDto responseHobbyDto = HobbyMapper.INSTANCE.hobbyToResponseHobbyDto(hobby);

        return ResponseEntity.ok(responseHobbyDto);
    }

    @PatchMapping("/{id}/interest")
    public ResponseEntity<ResponseHobbyDto> updateHobbyInterest(@PathVariable Long id, @RequestBody String interest) {
        log.info("Trying to patch hobby interest by id: {}", id);

        Hobby hobby = hobbyService.updateHobbyInterest(id, interest);

        ResponseHobbyDto responseHobbyDto = HobbyMapper.INSTANCE.hobbyToResponseHobbyDto(hobby);


        return ResponseEntity.ok(responseHobbyDto);
    }
}