package com.project.project.entities.post.service;

import com.project.project.entities.post.Post;
import com.project.project.entities.post.api.dto.ResponsePostWithLikeCommentsSumDto;
import com.project.project.entities.post.db.PostRepository;
import com.project.project.entities.post.status.PostStatus;
import com.project.project.entities.group.Group;
import com.project.project.exceptions.PostNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PostServiceImplTest {

    @Mock
    private PostRepository postRepository;

    @InjectMocks
    private PostServiceImpl postService;

    private Post post;
    private Group group;

    @BeforeEach
    public void setUp() {
        group = new Group();
        group.setId(1L);
        group.setName("Test Group");

        post = new Post();
        post.setId(1L);
        post.setUserId(1000L);
        post.setContent("Test Post");
        post.setGroup(group);
        post.setCreatedDate(LocalDateTime.now());
        post.setLastModifiedDate(LocalDateTime.now());
        post.setLikes(new HashSet<>());
        post.setComments(new HashSet<>());
    }

    @Test
    public void getPostById_Success() {
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));

        Post result = postService.getPostById(1L);

        assertNotNull(result);
        assertEquals("Test Post", result.getContent());
        verify(postRepository, times(1)).findById(1L);
    }

    @Test
    public void getPostById_PostNotFound() {
        when(postRepository.findById(1L)).thenReturn(Optional.empty());

        PostNotFoundException exception = assertThrows(PostNotFoundException.class, () -> {
            postService.getPostById(1L);
        });

        assertEquals(PostStatus.POST_NOT_FOUND.getMessage(), exception.getMessage());
        verify(postRepository, times(1)).findById(1L);
    }

    @Test
    public void getPostByIdWithTotalLikesComments() {
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));

        ResponsePostWithLikeCommentsSumDto result = postService.getPostByIdWithTotalLikesComments(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals(0, result.getTotalLikes());
        assertEquals(0, result.getTotalComments());
        verify(postRepository, times(1)).findById(1L);
    }

    @Test
    public void getPostsByUserId() {
        PageRequest pageable = PageRequest.of(0, 2);
        Page<Post> postsPage = new PageImpl<>(Collections.singletonList(post), pageable, 1);
        when(postRepository.getPostsByUserId(1000L, pageable)).thenReturn(postsPage);

        Page<Post> result = postService.getPostsByUserId(1000L, pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("Test Post", result.getContent().get(0).getContent());
        verify(postRepository, times(1)).getPostsByUserId(1000L, pageable);
    }

    @Test
    public void createPost() {
        when(postRepository.save(post)).thenReturn(post);

        Post result = postService.createPost(post);

        assertNotNull(result);
        assertEquals("Test Post", result.getContent());
        verify(postRepository, times(1)).save(post);
    }

    @Test
    public void patchPost_Success() {
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        when(postRepository.save(post)).thenReturn(post);

        Post result = postService.patchPost(1L, "Updated Content");

        assertNotNull(result);
        assertEquals("Updated Content", result.getContent());
        verify(postRepository, times(1)).findById(1L);
        verify(postRepository, times(1)).save(post);
    }

    @Test
    public void deletePost_Success() {
        when(postRepository.existsById(1L)).thenReturn(true);
        doNothing().when(postRepository).deleteById(1L);

        postService.deletePost(1L);

        verify(postRepository, times(1)).existsById(1L);
        verify(postRepository, times(1)).deleteById(1L);
    }

    @Test
    public void deletePost_PostNotFound() {
        when(postRepository.existsById(1L)).thenReturn(false);

        PostNotFoundException exception = assertThrows(PostNotFoundException.class, () -> {
            postService.deletePost(1L);
        });

        assertEquals(PostStatus.POST_NOT_FOUND.getMessage(), exception.getMessage());
        verify(postRepository, times(1)).existsById(1L);
    }
}
