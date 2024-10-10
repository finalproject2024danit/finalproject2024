package com.project.project.user.status;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum UserStatus {
    SUCCESS("Success operation."),
    USER_NOT_FOUND("User not found."),
    UNEXPECTED("An unexpected error occurred.");

    private final String message;
}
