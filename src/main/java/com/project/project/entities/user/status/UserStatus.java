package com.project.project.entities.user.status;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum UserStatus {
    SUCCESS("Success operation."),
    USER_NOT_FOUND("User not found."),
    UNEXPECTED("An unexpected error occurred."),
    USER_UPDATED("User is updated.");

    private final String message;
}
