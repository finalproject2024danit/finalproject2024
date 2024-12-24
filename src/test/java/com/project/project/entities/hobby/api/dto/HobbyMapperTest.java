package com.project.project.entities.hobby.api.dto;

import com.project.project.entities.hobby.Hobby;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class HobbyMapperTest {

    private final HobbyMapper hobbyMapper = HobbyMapper.INSTANCE;

    @Test
    void requestHobbyDtoToHobby() {
        RequestHobbyDto requestHobbyDto = new RequestHobbyDto();
        requestHobbyDto.setLanguage("English");
        requestHobbyDto.setPet("Dog");
        requestHobbyDto.setInterest("Reading");

        Hobby hobby = hobbyMapper.requestHobbyDtoToHobby(requestHobbyDto);

        assertNotNull(hobby);
        assertEquals("English", hobby.getLanguage());
        assertEquals("Dog", hobby.getPet());
        assertEquals("Reading", hobby.getInterest());
    }

    @Test
    void hobbyToResponseHobbyDto() {
        Hobby hobby = new Hobby();
        hobby.setId(1L);
        hobby.setLanguage("English");
        hobby.setPet("Dog");
        hobby.setInterest("Reading");
        hobby.setCreatedDate(LocalDateTime.now());
        hobby.setLastModifiedDate(LocalDateTime.now());

        ResponseHobbyDto responseHobbyDto = hobbyMapper.hobbyToResponseHobbyDto(hobby);

        assertNotNull(responseHobbyDto);
        assertEquals(1L, responseHobbyDto.getId());
        assertEquals("English", responseHobbyDto.getLanguage());
        assertEquals("Dog", responseHobbyDto.getPet());
        assertEquals("Reading", responseHobbyDto.getInterest());
        assertNotNull(responseHobbyDto.getCreatedDate());
        assertNotNull(responseHobbyDto.getLastModifiedDate());
    }

    @Test
    void mapHobbyToResponseHobbyDtoWithNullFields() {
        Hobby hobby = new Hobby();
        hobby.setId(2L);
        hobby.setLanguage(null);
        hobby.setPet(null);
        hobby.setInterest(null);
        hobby.setCreatedDate(LocalDateTime.now());
        hobby.setLastModifiedDate(LocalDateTime.now());

        ResponseHobbyDto responseHobbyDto = hobbyMapper.hobbyToResponseHobbyDto(hobby);

        assertNotNull(responseHobbyDto);
        assertEquals(2L, responseHobbyDto.getId());
        assertNull(responseHobbyDto.getLanguage());
        assertNull(responseHobbyDto.getPet());
        assertNull(responseHobbyDto.getInterest());
        assertNotNull(responseHobbyDto.getCreatedDate());
        assertNotNull(responseHobbyDto.getLastModifiedDate());
    }
}
