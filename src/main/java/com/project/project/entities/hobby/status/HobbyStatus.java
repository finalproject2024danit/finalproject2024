package com.project.project.entities.hobby.status;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum HobbyStatus {
    SUCCESS("Success operation."),
    HOBBY_NOT_FOUND("Hobby not found."),
    UNEXPECTED("An unexpected error occurred.");

    private final String message;
}
