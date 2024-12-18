package com.project.project.entities.comment.status;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum CommentStatus {
    SUCCESS("Success operation."),
    COMMENT_NOT_FOUND("Comment not found."),
    UNEXPECTED("An unexpected error occurred."),
    LIKED_SUCCESSFULLY("Comment liked/unliked successfully.");

    private final String message;
}
