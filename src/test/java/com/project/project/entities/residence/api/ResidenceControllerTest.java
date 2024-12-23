package com.project.project.entities.residence.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.project.entities.residence.Residence;
import com.project.project.entities.residence.api.dto.RequestResidenceDto;
import com.project.project.entities.residence.api.dto.ResponseResidenceDto;
import com.project.project.entities.residence.service.ResidenceServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class ResidenceControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ResidenceServiceImpl residenceService;

    @InjectMocks
    private ResidenceController residenceController;

    private Residence residence;
    private RequestResidenceDto requestResidenceDto;
    private ResponseResidenceDto responseResidenceDto;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(residenceController).build();

        residence = new Residence();
        residence.setId(1L);
        residence.setPlanet("Earth");
        residence.setCountry("Country");
        residence.setCity("City");

        requestResidenceDto = new RequestResidenceDto();
        requestResidenceDto.setPlanet("Earth");
        requestResidenceDto.setCountry("Country");
        requestResidenceDto.setCity("City");

        responseResidenceDto = new ResponseResidenceDto();
        responseResidenceDto.setId(1L);
        responseResidenceDto.setPlanet("Earth");
        responseResidenceDto.setCountry("Country");
        responseResidenceDto.setCity("City");
    }

    @Test
    void getResidenceById() throws Exception {
        when(residenceService.getResidenceById(1L)).thenReturn(residence);

        mockMvc.perform(get("/api/v1/residences/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.planet").value("Earth"))
                .andExpect(jsonPath("$.country").value("Country"))
                .andExpect(jsonPath("$.city").value("City"));

        verify(residenceService, times(1)).getResidenceById(1L);
    }

    @Test
    void updateResidence() throws Exception {
        when(residenceService.updateResidence(eq(1L), eq("Earth"), eq("Country"), eq("City"))).thenReturn(residence);

        mockMvc.perform(patch("/api/v1/residences/update/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestResidenceDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.planet").value("Earth"))
                .andExpect(jsonPath("$.country").value("Country"))
                .andExpect(jsonPath("$.city").value("City"));

        verify(residenceService, times(1)).updateResidence(eq(1L), eq("Earth"), eq("Country"), eq("City"));
    }

    @Test
    void getAllResidences() throws Exception {
        when(residenceService.getAllResidences(any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(residence)));

        mockMvc.perform(get("/api/v1/residences/filter")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].planet").value("Earth"))
                .andExpect(jsonPath("$[0].country").value("Country"))
                .andExpect(jsonPath("$[0].city").value("City"));

        verify(residenceService, times(1)).getAllResidences(any(Pageable.class));
    }
}
