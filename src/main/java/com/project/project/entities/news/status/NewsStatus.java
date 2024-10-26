package com.project.project.entities.news.status;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum NewsStatus {
    SUCCESS("Success operation."),
    NEWS_NOT_FOUND("News not found."),
    UNEXPECTED("An unexpected error occurred.");

    private final String message;
}
