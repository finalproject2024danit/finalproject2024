package com.project.project.entities.comment.service;

import com.project.project.entities.comment.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {
    Comment getCommentById(long id);

    Comment createComment(Comment comment);

    void deleteCommentById(long id);

    void likeComment(Long commentId, Long userId);

    Page<Comment> getCommentsByPostId(long postId, Pageable pageable);
}
