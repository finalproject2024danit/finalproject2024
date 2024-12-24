package com.project.project.entities.like.service;

import com.project.project.entities.like.Like;
import com.project.project.entities.like.db.LikeRepository;
import com.project.project.entities.post.Post;
import com.project.project.entities.post.db.PostRepository;
import com.project.project.exceptions.LikeNotFoundException;
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

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LikeServiceImplTest {

    @Mock
    private LikeRepository likeRepository;

    @Mock
    private PostRepository postRepository;

    @InjectMocks
    private LikeServiceImpl likeService;

    private Post post;
    private Like like;

    @BeforeEach
    public void setUp() {
        post = new Post();
        post.setId(1L);
        post.setContent("Test Post");

        like = new Like();
        like.setId(1L);
        like.setPost(post);
        like.setUserId(1L);
    }

    @Test
    void getLikeById_Success() {
        when(likeRepository.findById(1L)).thenReturn(Optional.of(like));

        Like result = likeService.getLikeById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(likeRepository, times(1)).findById(1L);
    }

    @Test
    void getLikeById_LikeNotFound() {
        when(likeRepository.findById(1L)).thenReturn(Optional.empty());

        LikeNotFoundException exception = assertThrows(LikeNotFoundException.class, () -> {
            likeService.getLikeById(1L);
        });

        assertEquals("Like not found.", exception.getMessage());
        verify(likeRepository, times(1)).findById(1L);
    }

    @Test
    void addLike_AlreadyLiked() {
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        when(likeRepository.findByPostIdAndUserId(1L, 1L)).thenReturn(like);
        doNothing().when(likeRepository).delete(like);

        Like result = likeService.addLike(1L, 1L);

        assertEquals(like, result);
        verify(likeRepository, times(1)).delete(like);
    }

    @Test
    void addLike_NotLiked() {
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        when(likeRepository.findByPostIdAndUserId(1L, 1L)).thenReturn(null);
        when(likeRepository.save(any(Like.class))).thenReturn(like);

        Like result = likeService.addLike(1L, 1L);

        assertNotNull(result);
        assertEquals(post, result.getPost());
        assertEquals(1L, result.getUserId());
        verify(likeRepository, times(1)).save(any(Like.class));
    }

    @Test
    void getLikesByPostId() {
        PageRequest pageable = PageRequest.of(0, 10);
        Page<Like> likesPage = new PageImpl<>(List.of(like), pageable, 1);
        when(likeRepository.findByPostId(1L, pageable)).thenReturn(likesPage);

        Page<Like> result = likeService.getLikesByPostId(1L, pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(like, result.getContent().get(0));
        verify(likeRepository, times(1)).findByPostId(1L, pageable);
    }

    @Test
    void addLike_PostNotFound() {
        when(postRepository.findById(1L)).thenReturn(Optional.empty());

        PostNotFoundException exception = assertThrows(PostNotFoundException.class, () -> {
            likeService.addLike(1L, 1L);
        });

        assertEquals("Post not found.", exception.getMessage());
        verify(postRepository, times(1)).findById(1L);
    }
}
