package com.project.project.entities.post.db;

import com.project.project.entities.group.Group;
import com.project.project.entities.post.Post;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@Transactional
@ActiveProfiles("local")
class PostRepositoryTest {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private PostRepository postRepository;

    private Group group;

    @BeforeEach
    public void setUp() {
        group = new Group();
        group.setName("Test Group");
        group.setIsOpen(true);
        group.setCreatedDate(LocalDateTime.now());
        group.setLastModifiedDate(LocalDateTime.now());
        entityManager.persist(group);
    }

    @Test
    void getPostsByUserId() {
        Post post1 = new Post();
        post1.setUserId(1000L);
        post1.setContent("Test Post 1");
        post1.setGroup(group);
        post1.setCreatedDate(LocalDateTime.now());
        post1.setLastModifiedDate(LocalDateTime.now());
        postRepository.save(post1);

        Post post2 = new Post();
        post2.setUserId(1000L);
        post2.setContent("Test Post 2");
        post2.setGroup(group);
        post2.setCreatedDate(LocalDateTime.now());
        post2.setLastModifiedDate(LocalDateTime.now());
        postRepository.save(post2);

        Pageable pageable = PageRequest.of(0, 10);
        Page<Post> page = postRepository.getPostsByUserId(1000L, pageable);

        assertNotNull(page);
        assertEquals(2, page.getTotalElements());
        assertTrue(page.getContent().stream().allMatch(post -> post.getUserId() == 1000L));
    }

    @Test
    void savePost() {
        Post post = new Post();
        post.setUserId(1000L);
        post.setContent("Test Post with Group");
        post.setGroup(group);
        post.setCreatedDate(LocalDateTime.now());
        post.setLastModifiedDate(LocalDateTime.now());

        Post savedPost = postRepository.save(post);
        assertNotNull(savedPost.getId());
        assertEquals(group.getId(), savedPost.getGroup().getId());
    }
}
