package com.project.project.entities.news.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.project.entities.news.News;
import com.project.project.entities.news.api.dto.ResponseNewsDto;
import com.project.project.entities.news.service.NewsServiceImpl;
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
class NewsControllerTest {

    private MockMvc mockMvc;

    @Mock
    private NewsServiceImpl newsService;

    @InjectMocks
    private NewsController newsController;

    private News news;
    private ResponseNewsDto responseNewsDto;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(newsController).build();

        news = new News();
        news.setId(1L);
        news.setName("Test News");
        news.setText("Test news content");
        news.setPhoto("Test photo");
        news.setCreatedDate(null);
        news.setLastModifiedDate(null);

        responseNewsDto = new ResponseNewsDto();
        responseNewsDto.setId(1L);
        responseNewsDto.setName("Test News");
        responseNewsDto.setText("Test news content");
        responseNewsDto.setPhoto("Test photo");
        responseNewsDto.setCreatedDate(null);
        responseNewsDto.setLastModifiedDate(null);
    }

    @Test
    void getNewsById() throws Exception {
        when(newsService.getNewsById(1L)).thenReturn(news);

        mockMvc.perform(get("/api/v1/news/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Test News"))
                .andExpect(jsonPath("$.text").value("Test news content"))
                .andExpect(jsonPath("$.photo").value("Test photo"));

        verify(newsService, times(1)).getNewsById(1L);
    }

    @Test
    void getNewsById_NotFound() throws Exception {
        when(newsService.getNewsById(32947L)).thenReturn(null);

        mockMvc.perform(get("/api/v1/news/{id}", 32947L))
                .andExpect(status().isOk())
                .andExpect(content().string(""))
                .andExpect(jsonPath("$").doesNotExist());


        verify(newsService, times(1)).getNewsById(32947L);
    }

    @Test
    void getAllNews() throws Exception {
        when(newsService.findAllFiltered(any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(news)));

        mockMvc.perform(get("/api/v1/news/filter")
                        .param("startPage", "0")
                        .param("perPage", "10")
                        .param("sortBy", "id")
                        .param("sortDirection", "asc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].name").value("Test News"))
                .andExpect(jsonPath("$[0].text").value("Test news content"))
                .andExpect(jsonPath("$[0].photo").value("Test photo"));

        verify(newsService, times(1)).findAllFiltered(any(Pageable.class));
    }

    @Test
    void getAllNews_Empty() throws Exception {
        when(newsService.findAllFiltered(any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of()));

        mockMvc.perform(get("/api/v1/news/filter")
                        .param("startPage", "0")
                        .param("perPage", "10")
                        .param("sortBy", "id")
                        .param("sortDirection", "asc"))
                .andExpect(status().isNotFound());

        verify(newsService, times(1)).findAllFiltered(any(Pageable.class));
    }
}
