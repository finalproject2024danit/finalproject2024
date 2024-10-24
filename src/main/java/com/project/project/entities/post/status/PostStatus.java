package com.project.project.entities.post.status;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum PostStatus {
    SUCCESS("Success operation."),
    POST_NOT_FOUND("Post not found."),
    UNEXPECTED("An unexpected error occurred."),
    POST_UPDATED("User is updated."),
    POST_DELETED("Post is deleted.");

    private final String message;
}
