package com.project.project.entities.comment.db;

import com.project.project.entities.comment.Comment;
import com.project.project.entities.like.Like;
import com.project.project.entities.post.Post;
import com.project.project.entities.post.db.PostRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@Transactional
@ActiveProfiles("local")
class CommentRepositoryTest {
    @Autowired
    private EntityManager entityManager;

    @Autowired
    private CommentRepository commentRepository;

    @Mock
    private PostRepository postRepository;

    private Post post;

    @BeforeEach
    public void setUp() {
        post = new Post();
        post.setId(1L);
        post.setContent("This is a test post.");
        post.setCreatedDate(LocalDateTime.now());

        when(postRepository.findById(post.getId())).thenReturn(java.util.Optional.of(post));
    }

    @Test
    void findByPostId() {
        Comment comment1 = new Comment();
        comment1.setPost(post);
        comment1.setUserId(1L);
        comment1.setContent("Test comment 1");
        comment1.setCreatedDate(LocalDateTime.now());
        comment1.setLastModifiedDate(LocalDateTime.now());
        commentRepository.save(comment1);

        Comment comment2 = new Comment();
        comment2.setPost(post);
        comment2.setUserId(2L);
        comment2.setContent("Test comment 2");
        comment2.setCreatedDate(LocalDateTime.now());
        comment2.setLastModifiedDate(LocalDateTime.now());
        commentRepository.save(comment2);

        Pageable pageable = PageRequest.of(0, 10);
        var page = commentRepository.findByPostId(post.getId(), pageable);

        assertNotNull(page);
        assertEquals(2, page.getTotalElements());
        assertTrue(page.getContent().stream().allMatch(c -> c.getPost().getId().equals(post.getId())));
    }

    @Test
    public void deleteCommentByIdNew() {
        Comment comment = new Comment();
        comment.setPost(post);
        comment.setUserId(1L);
        comment.setContent("Test comment for deletion");
        comment.setCreatedDate(LocalDateTime.now());
        comment.setLastModifiedDate(LocalDateTime.now());

        commentRepository.save(comment);
        Long commentId = comment.getId();
        assertNotNull(commentId);
        assertTrue(commentRepository.findById(commentId).isPresent());

        commentRepository.deleteCommentByIdNew(commentId);

        commentRepository.flush();
        entityManager.clear();

        assertFalse(commentRepository.findById(commentId).isPresent());
    }






}