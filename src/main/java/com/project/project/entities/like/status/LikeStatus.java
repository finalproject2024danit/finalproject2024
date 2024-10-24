package com.project.project.entities.like.status;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum LikeStatus {
    SUCCESS("Success operation."),
    LIKE_NOT_FOUND("Like not found."),
    UNEXPECTED("An unexpected error occurred.");

    private final String message;
    }
