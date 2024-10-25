package com.project.project.entities.comment.service;

import com.project.project.entities.comment.Comment;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentService {
    Comment getCommentById(long id);

    void likeComment(Long commentId, Long userId);
}
