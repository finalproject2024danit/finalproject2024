package com.project.project.entities.comment.service;

import com.project.project.entities.comment.Comment;
import com.project.project.entities.comment.db.CommentRepository;
import com.project.project.entities.comment.status.CommentStatus;
import com.project.project.exceptions.CommentNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public Comment getCommentById(long id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new CommentNotFoundException(CommentStatus.COMMENT_NOT_FOUND.getMessage()));
    }
}
