package com.project.project.entities.like.db;

import com.project.project.entities.comment.db.CommentRepository;
import com.project.project.entities.like.Like;
import com.project.project.entities.post.Post;
import com.project.project.entities.comment.Comment;
import com.project.project.entities.post.db.PostRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@Transactional
@ActiveProfiles("local")
class LikeRepositoryTest {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private EntityManager entityManager;

    @Mock
    private PostRepository postRepository;

    private Post post;
    private Comment comment;

    @BeforeEach
    public void setUp() {
        post = new Post();
        post.setId(1L);
        post.setContent("This is a test post.");
        post.setCreatedDate(LocalDateTime.now());

        comment = new Comment();
        comment.setId(1L);
        comment.setPost(post);
        comment.setUserId(1L);
        comment.setContent("This is a test comment.");
        comment.setCreatedDate(LocalDateTime.now());
        comment.setLastModifiedDate(LocalDateTime.now());

        when(postRepository.findById(post.getId())).thenReturn(java.util.Optional.of(post));
    }

    @Test
    void findByPostIdAndUserId() {
        Like like = new Like();
        like.setPost(post);
        like.setUserId(1L);
        like.setCreatedDate(LocalDateTime.now());
        like.setLastModifiedDate(LocalDateTime.now());
        likeRepository.save(like);

        Like foundLike = likeRepository.findByPostIdAndUserId(post.getId(), 1L);

        assertNotNull(foundLike);
        assertEquals(post.getId(), foundLike.getPost().getId());
        assertEquals(1L, foundLike.getUserId());
    }

    @Test
    void findByPostIdWithPagination() {
        Like like1 = new Like();
        like1.setPost(post);
        like1.setUserId(1L);
        like1.setCreatedDate(LocalDateTime.now());
        like1.setLastModifiedDate(LocalDateTime.now());
        likeRepository.save(like1);

        Like like2 = new Like();
        like2.setPost(post);
        like2.setUserId(2L);
        like2.setCreatedDate(LocalDateTime.now());
        like2.setLastModifiedDate(LocalDateTime.now());
        likeRepository.save(like2);

        Pageable pageable = PageRequest.of(0, 10);
        Page<Like> page = likeRepository.findByPostId(post.getId(), pageable);

        assertNotNull(page);
        assertEquals(2, page.getTotalElements());
        assertTrue(page.getContent().stream().allMatch(like -> like.getPost().getId().equals(post.getId())));
    }

    @Test
    void deleteLikeById() {
        Like like = new Like();
        like.setPost(post);
        like.setUserId(1L);
        like.setCreatedDate(LocalDateTime.now());
        like.setLastModifiedDate(LocalDateTime.now());
        likeRepository.save(like);

        Long likeId = like.getId();
        assertNotNull(likeId);
        assertTrue(likeRepository.findById(likeId).isPresent());

        likeRepository.deleteById(likeId);

        likeRepository.flush();
        entityManager.clear();

        assertFalse(likeRepository.findById(likeId).isPresent());
    }
}
