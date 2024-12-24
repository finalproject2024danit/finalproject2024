package com.project.project.entities.comment.api.dto;

import com.project.project.entities.comment.Comment;
import com.project.project.entities.like.Like;
import com.project.project.entities.like.api.dto.ResponseLikeDto;
import com.project.project.entities.post.Post;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class CommentMapperTest {

    private final CommentMapper commentMapper = CommentMapper.INSTANCE;

    @Test
    void requestCommentDtoToComment() {
        RequestCommentDto requestCommentDto = new RequestCommentDto();
        requestCommentDto.setPostId(1L);
        requestCommentDto.setContent("This is a comment");
        requestCommentDto.setUserId(2L);

        Comment comment = commentMapper.requestCommentDtoToComment(requestCommentDto);

        assertNotNull(comment);
        assertEquals(1L, comment.getPost().getId());
        assertEquals("This is a comment", comment.getContent());
        assertEquals(2L, comment.getUserId());
    }

    @Test
    void commentToResponseCommentDto() {
        Post post = new Post();
        post.setId(3L);
        Comment comment = new Comment();
        comment.setId(1L);
        comment.setPost(post);
        comment.setUserId(2L);
        comment.setContent("This is a comment");
        comment.setCreatedDate(LocalDateTime.now());
        comment.setLastModifiedDate(LocalDateTime.now());
        comment.setLikedByUsers(new HashSet<>());

        ResponseCommentDto responseCommentDto = commentMapper.commentToResponseCommentDto(comment);

        assertNotNull(responseCommentDto);
        assertEquals(1L, responseCommentDto.getId());
        assertEquals(2L, responseCommentDto.getUserId());
        assertEquals(3L, responseCommentDto.getPostId());
        assertEquals("This is a comment", responseCommentDto.getContent());
        assertNotNull(responseCommentDto.getCreatedDate());
        assertNotNull(responseCommentDto.getLastModifiedDate());
        assertTrue(responseCommentDto.getLikes().isEmpty());
    }

    @Test
    void mapLikes() {
        Like like = new Like();
        like.setId(1L);
        Set<Like> likes = new HashSet<>();
        likes.add(like);

        Set<ResponseLikeDto> responseLikes = commentMapper.mapLikes(likes);

        assertNotNull(responseLikes);
        assertEquals(1, responseLikes.size());
        assertTrue(responseLikes.stream().anyMatch(l -> l.getId() == 1L));
    }
}