package com.project.project.entities.like.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.project.entities.like.Like;
import com.project.project.entities.like.api.dto.ResponseLikeDto;
import com.project.project.entities.like.service.LikeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class LikeControllerTest {

    private MockMvc mockMvc;

    @Mock
    private LikeServiceImpl likeService;

    @InjectMocks
    private LikeController likeController;

    private Like like;
    private ResponseLikeDto responseLikeDto;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(likeController).build();

        like = new Like();
        like.setId(1L);
        like.setUserId(1L);

        responseLikeDto = new ResponseLikeDto();
        responseLikeDto.setId(1L);
        responseLikeDto.setUserId(1L);
    }

    @Test
    void getLikeById() throws Exception {
        when(likeService.getLikeById(1L)).thenReturn(like);

        mockMvc.perform(get("/api/v1/likes/like/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.userId").value(1L));

        verify(likeService, times(1)).getLikeById(1L);
    }

    @Test
    void likePost() throws Exception {
        when(likeService.addLike(1L, 1L)).thenReturn(like);

        mockMvc.perform(post("/api/v1/likes/liked")
                        .param("postId", "1")
                        .param("userId", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.userId").value(1L));

        verify(likeService, times(1)).addLike(1L, 1L);
    }

    @Test
    void getLikesByPostId() throws Exception {
        List<Like> likes = List.of(like);
        when(likeService.getLikesByPostId(eq(1L), any(Pageable.class))).thenReturn(new PageImpl<>(likes));

        mockMvc.perform(get("/api/v1/likes/like/post/{postId}", 1L)
                        .param("startPage", "0")
                        .param("perPage", "10")
                        .param("sortBy", "id")
                        .param("sortDirection", "asc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L));

        verify(likeService, times(1)).getLikesByPostId(eq(1L), any(Pageable.class));
    }
}
