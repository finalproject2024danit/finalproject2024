package com.project.project.entities.hobby.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.project.entities.hobby.Hobby;
import com.project.project.entities.hobby.api.dto.RequestHobbyDto;
import com.project.project.entities.hobby.api.dto.ResponseHobbyDto;
import com.project.project.entities.hobby.service.HobbyServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class HobbyControllerTest {

    private MockMvc mockMvc;

    @Mock
    private HobbyServiceImpl hobbyService;

    @InjectMocks
    private HobbyController hobbyController;

    private Hobby hobby;
    private RequestHobbyDto requestHobbyDto;
    private ResponseHobbyDto responseHobbyDto;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(hobbyController).build();

        hobby = new Hobby();
        hobby.setId(1L);
        hobby.setLanguage("English");
        hobby.setPet("Dog");
        hobby.setInterest("Photography");

        requestHobbyDto = new RequestHobbyDto();
        requestHobbyDto.setLanguage("Spanish");
        requestHobbyDto.setPet("Cat");
        requestHobbyDto.setInterest("Traveling");

        responseHobbyDto = new ResponseHobbyDto();
        responseHobbyDto.setId(1L);
        responseHobbyDto.setLanguage("English");
        responseHobbyDto.setPet("Dog");
        responseHobbyDto.setInterest("Photography");
    }

    @Test
    void getHobbyById() throws Exception {
        when(hobbyService.getHobbyById(1L)).thenReturn(hobby);

        mockMvc.perform(get("/api/v1/hobbies/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.language").value("English"))
                .andExpect(jsonPath("$.pet").value("Dog"))
                .andExpect(jsonPath("$.interest").value("Photography"));

        verify(hobbyService, times(1)).getHobbyById(1L);
    }

    @Test
    void updateHobby() throws Exception {
        when(hobbyService.updateHobby(1L, "Spanish", "Cat", "Traveling")).thenReturn(hobby);

        mockMvc.perform(patch("/api/v1/hobbies/update/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestHobbyDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.language").value("English"))
                .andExpect(jsonPath("$.pet").value("Dog"))
                .andExpect(jsonPath("$.interest").value("Photography"));

        verify(hobbyService, times(1)).updateHobby(1L, "Spanish", "Cat", "Traveling");
    }
}
