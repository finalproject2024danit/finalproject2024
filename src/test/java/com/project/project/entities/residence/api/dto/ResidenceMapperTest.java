package com.project.project.entities.residence.api.dto;

import com.project.project.entities.residence.Residence;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

class ResidenceMapperTest {

    private final ResidenceMapper residenceMapper = ResidenceMapper.INSTANCE;

    @Test
    void testRequestResidenceDtoToResidence() {
        RequestResidenceDto requestResidenceDto = new RequestResidenceDto();
        requestResidenceDto.setPlanet("Earth");
        requestResidenceDto.setCountry("USA");
        requestResidenceDto.setCity("New York");

        Residence residence = residenceMapper.requestResidenceDtoToResidence(requestResidenceDto);

        assertNotNull(residence);
        assertEquals("Earth", residence.getPlanet());
        assertEquals("USA", residence.getCountry());
        assertEquals("New York", residence.getCity());
    }

    @Test
    void testResidenceToResponseResidenceDto() {
        Residence residence = new Residence();
        residence.setId(1L);
        residence.setPlanet("Earth");
        residence.setCountry("USA");
        residence.setCity("New York");
        residence.setCreatedDate(LocalDateTime.now());
        residence.setLastModifiedDate(LocalDateTime.now());

        ResponseResidenceDto responseResidenceDto = residenceMapper.residenceToResponseResidenceDto(residence);

        assertNotNull(responseResidenceDto);
        assertEquals(1L, responseResidenceDto.getId());
        assertEquals("Earth", responseResidenceDto.getPlanet());
        assertEquals("USA", responseResidenceDto.getCountry());
        assertEquals("New York", responseResidenceDto.getCity());
        assertNotNull(responseResidenceDto.getCreatedDate());
        assertNotNull(responseResidenceDto.getLastModifiedDate());
    }
}
