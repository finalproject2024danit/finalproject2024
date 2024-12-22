package com.project.project.entities.like.api.dto;

import com.project.project.entities.like.Like;
import com.project.project.entities.post.Post;
import com.project.project.entities.comment.Comment;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class LikeMapperTest {

    private final LikeMapper likeMapper = LikeMapper.INSTANCE;

    @Test
    void likeToResponseLikeDto() {
        Post post = new Post();
        post.setId(1L);

        Comment comment = new Comment();
        comment.setId(2L);

        Like like = new Like();
        like.setId(3L);
        like.setPost(post);
        like.setComment(comment);
        like.setUserId(4L);
        like.setCreatedDate(LocalDateTime.now());
        like.setLastModifiedDate(LocalDateTime.now());

        ResponseLikeDto responseLikeDto = likeMapper.likeToResponseLikeDto(like);

        assertNotNull(responseLikeDto);
        assertEquals(3L, responseLikeDto.getId());
        assertEquals(1L, responseLikeDto.getPostId());
        assertEquals(2L, responseLikeDto.getCommentId());
        assertEquals(4L, responseLikeDto.getUserId());
        assertNotNull(responseLikeDto.getCreatedDate());
        assertNotNull(responseLikeDto.getLastModifiedDate());
    }
}
