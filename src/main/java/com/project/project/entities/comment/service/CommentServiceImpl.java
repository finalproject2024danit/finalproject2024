package com.project.project.entities.comment.service;

import com.project.project.entities.comment.Comment;
import com.project.project.entities.comment.db.CommentRepository;
import com.project.project.entities.comment.status.CommentStatus;
import com.project.project.entities.like.Like;
import com.project.project.entities.like.db.LikeRepository;
import com.project.project.exceptions.CommentNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;

    @Override
    public Comment getCommentById(long id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new CommentNotFoundException(CommentStatus.COMMENT_NOT_FOUND.getMessage()));
    }

    public void likeComment(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException(CommentStatus.COMMENT_NOT_FOUND.getMessage()));

        Like existingLike = likeRepository.findByCommentIdAndUserId(commentId, userId);

        if (existingLike != null) {
            likeRepository.delete(existingLike);
        } else {
            Like newLike = new Like();
            newLike.setComment(comment);
            newLike.setUserId(userId);
            likeRepository.save(newLike);
        }
    }
}
