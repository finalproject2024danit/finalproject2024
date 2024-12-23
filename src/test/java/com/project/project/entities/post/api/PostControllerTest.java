package com.project.project.entities.post.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.project.entities.post.Post;
import com.project.project.entities.post.api.dto.RequestPostDto;
import com.project.project.entities.post.api.dto.ResponsePostDto;
import com.project.project.entities.post.service.PostServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class PostControllerTest {

    private MockMvc mockMvc;

    @Mock
    private PostServiceImpl postService;

    @InjectMocks
    private PostController postController;

    private Post post;
    private RequestPostDto requestPostDto;
    private ResponsePostDto responsePostDto;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(postController).build();

        post = new Post();
        post.setId(1L);
        post.setUserId(1L);
        post.setContent("Test post");
        post.setCreatedDate(LocalDateTime.now());
        post.setLastModifiedDate(LocalDateTime.now());

        requestPostDto = new RequestPostDto();
        requestPostDto.setContent("Test post");
        requestPostDto.setUserId(1L);
        requestPostDto.setGroupId(1L);

        responsePostDto = new ResponsePostDto();
        responsePostDto.setId(1L);
        responsePostDto.setContent("Test post");
    }

    @Test
    void getPostById() throws Exception {
        when(postService.getPostById(1L)).thenReturn(post);

        mockMvc.perform(get("/api/v1/posts/post/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.content").value("Test post"));

        verify(postService, times(1)).getPostById(1L);
    }

    @Test
    void getPostsByUserId() throws Exception {
        when(postService.getPostsByUserId(eq(1L), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(post)));

        mockMvc.perform(get("/api/v1/posts/user/{userId}", 1L)
                        .param("startPage", "0")
                        .param("perPage", "10")
                        .param("sortBy", "id")
                        .param("sortDirection", "asc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(1L))
                .andExpect(jsonPath("$.content[0].content").value("Test post"));

        verify(postService, times(1)).getPostsByUserId(eq(1L), any(Pageable.class));
    }

    @Test
    void createPost() throws Exception {
        when(postService.createPost(any(Post.class))).thenReturn(post);

        mockMvc.perform(post("/api/v1/posts/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestPostDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.content").value("Test post"));

        verify(postService, times(1)).createPost(any(Post.class));
    }

    @Test
    void updatePostContent() throws Exception {
        when(postService.patchPost(eq(1L), eq("Updated content"))).thenReturn(post);

        requestPostDto.setContent("Updated content");

        mockMvc.perform(patch("/api/v1/posts/post/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestPostDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.content").value("Test post"));

        verify(postService, times(1)).patchPost(eq(1L), eq("Updated content"));
    }

    @Test
    void deletePost() throws Exception {
        doNothing().when(postService).deletePost(1L);

        mockMvc.perform(delete("/api/v1/posts/delete/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(content().string("Post was deleted with id: 1"));

        verify(postService, times(1)).deletePost(1L);
    }
}
