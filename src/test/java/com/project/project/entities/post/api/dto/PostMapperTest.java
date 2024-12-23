package com.project.project.entities.post.api.dto;

import com.project.project.entities.comment.Comment;
import com.project.project.entities.like.Like;
import com.project.project.entities.post.Post;
import com.project.project.entities.group.Group;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.*;

class PostMapperTest {

    private final PostMapper postMapper = PostMapper.INSTANCE;

    @Test
    void requestPostDtoToPost() {
        RequestPostDto requestPostDto = new RequestPostDto();
        requestPostDto.setUserId(1L);
        requestPostDto.setContent("Sample post content");
        requestPostDto.setGroupId(2L);

        Post post = postMapper.requestPostDtoToPost(requestPostDto);

        assertNotNull(post);
        assertEquals(1L, post.getUserId());
        assertEquals("Sample post content", post.getContent());
        assertNotNull(post.getGroup());
        assertEquals(2L, post.getGroup().getId());
    }

    @Test
    void postToPostDto() {
        Group group = new Group();
        group.setId(2L);

        Post post = new Post();
        post.setId(1L);
        post.setUserId(3L);
        post.setContent("Another sample content");
        post.setGroup(group);
        post.setCreatedDate(LocalDateTime.now());
        post.setLastModifiedDate(LocalDateTime.now());

        ResponsePostDto responsePostDto = postMapper.postToPostDto(post);

        assertNotNull(responsePostDto);
        assertEquals(1L, responsePostDto.getId());
        assertEquals(3L, responsePostDto.getUserId());
        assertEquals("Another sample content", responsePostDto.getContent());
        assertEquals(2L, responsePostDto.getGroupId());
        assertNotNull(responsePostDto.getCreatedDate());
        assertNotNull(responsePostDto.getLastModifiedDate());
    }

    @Test
    void postToPostWithLikesCommentsSumDto() {
        Group group = new Group();
        group.setId(3L);

        Post post = new Post();
        post.setId(2L);
        post.setUserId(4L);
        post.setContent("Post with likes and comments");
        post.setGroup(group);
        post.setCreatedDate(LocalDateTime.now());
        post.setLastModifiedDate(LocalDateTime.now());
        post.setLikes(new HashSet<>());
        post.setComments(new HashSet<>());

        ResponsePostWithLikeCommentsSumDto responseDto = postMapper.postToPostWithLikesCommentsSumDto(post);

        assertNotNull(responseDto);
        assertEquals(2L, responseDto.getId());
        assertEquals(4L, responseDto.getUserId());
        assertEquals("Post with likes and comments", responseDto.getContent());
        assertEquals(3L, responseDto.getGroupId());
        assertEquals(0, responseDto.getTotalLikes());
        assertEquals(0, responseDto.getTotalComments());
        assertNotNull(responseDto.getCreatedDate());
        assertNotNull(responseDto.getLastModifiedDate());
    }

    @Test
    void postToPostWithLikesCommentsSumDto_withLikesAndComments() {
        Group group = new Group();
        group.setId(4L);

        Post post = new Post();
        post.setId(3L);
        post.setUserId(5L);
        post.setContent("Post with data");
        post.setGroup(group);
        post.setCreatedDate(LocalDateTime.now());
        post.setLastModifiedDate(LocalDateTime.now());

        Like like1 = new Like();
        like1.setId(1L);
        Like like2 = new Like();
        like2.setId(2L);
        post.getLikes().add(like1);
        post.getLikes().add(like2);

        Comment comment1 = new Comment();
        comment1.setId(1L);
        Comment comment2 = new Comment();
        comment2.setId(2L);
        Comment comment3 = new Comment();
        comment3.setId(3L);
        post.getComments().add(comment1);
        post.getComments().add(comment2);
        post.getComments().add(comment3);

        System.out.println(post);

        ResponsePostWithLikeCommentsSumDto responseDto = postMapper.postToPostWithLikesCommentsSumDto(post);

        assertNotNull(responseDto);
        assertEquals(3L, responseDto.getId());
        assertEquals(5L, responseDto.getUserId());
        assertEquals("Post with data", responseDto.getContent());
        assertEquals(4L, responseDto.getGroupId());
        assertEquals(2, responseDto.getTotalLikes());
        assertEquals(3, responseDto.getTotalComments());
        assertNotNull(responseDto.getCreatedDate());
        assertNotNull(responseDto.getLastModifiedDate());
    }
}
