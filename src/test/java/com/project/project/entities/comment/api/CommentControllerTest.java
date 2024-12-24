package com.project.project.entities.comment.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.project.entities.comment.Comment;
import com.project.project.entities.comment.api.dto.LikeCommentRequestDto;
import com.project.project.entities.comment.api.dto.RequestCommentDto;
import com.project.project.entities.comment.api.dto.ResponseCommentDto;
import com.project.project.entities.comment.service.CommentServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
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
class CommentControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CommentServiceImpl commentService;

    @InjectMocks
    private CommentController commentController;

    private Comment comment;
    private RequestCommentDto requestCommentDto;
    private ResponseCommentDto responseCommentDto;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(commentController).build();

        comment = new Comment();
        comment.setId(1000L);
        comment.setContent("Test comment");

        requestCommentDto = new RequestCommentDto();
        requestCommentDto.setContent("Test comment");

        responseCommentDto = new ResponseCommentDto();
        responseCommentDto.setId(1000L);
        responseCommentDto.setContent("Test comment");
    }

    @Test
    void getCommentById() throws Exception {
        when(commentService.getCommentById(1000L)).thenReturn(comment);

        mockMvc.perform(get("/api/v1/comments/comment/{id}", 1000L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1000L))
                .andExpect(jsonPath("$.content").value("Test comment"));

        verify(commentService, times(1)).getCommentById(1000L);
    }

    @Test
    void createComment() throws Exception {
        when(commentService.createComment(any(Comment.class))).thenReturn(comment);

        mockMvc.perform(post("/api/v1/comments/comment/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestCommentDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1000L))
                .andExpect(jsonPath("$.content").value("Test comment"));

        verify(commentService, times(1)).createComment(any(Comment.class));
    }

    @Test
    void deleteCommentById() throws Exception {
        doNothing().when(commentService).deleteCommentById(1000L);

        mockMvc.perform(delete("/api/v1/comments/comment/delete/{id}", 1000L))
                .andExpect(status().isOk())
                .andExpect(content().string("Comment was successfully deleted"));

        verify(commentService, times(1)).deleteCommentById(1000L);
    }

    @Test
    void likeComment() throws Exception {
        LikeCommentRequestDto likeCommentRequestDto = new LikeCommentRequestDto();
        likeCommentRequestDto.setCommentId(1000L);
        likeCommentRequestDto.setUserId(1L);

        mockMvc.perform(post("/api/v1/comments/like")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(likeCommentRequestDto)))
                .andExpect(status().isOk())
                .andExpect(content().string("Comment liked/unliked successfully."));

        verify(commentService, times(1)).likeComment(1000L, 1L);
    }

    @Test
    void getCommentsByPostId() throws Exception {
        when(commentService.getCommentsByPostId(eq(1000L), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(comment)));

        mockMvc.perform(get("/api/v1/comments/comment/post/{postId}", 1000L)
                        .param("startPage", "0")
                        .param("perPage", "10")
                        .param("sortBy", "id")
                        .param("sortDirection", "asc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1000L))
                .andExpect(jsonPath("$[0].content").value("Test comment"));

        verify(commentService, times(1)).getCommentsByPostId(eq(1000L), any(Pageable.class));
    }
}