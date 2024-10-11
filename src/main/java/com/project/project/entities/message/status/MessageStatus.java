package com.project.project.entities.message.status;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum MessageStatus {
    SUCCESS("Success operation."),
    MESSAGE_NOT_FOUND("Message not found."),
    UNEXPECTED("An unexpected error occurred.");

    private final String message;
}
