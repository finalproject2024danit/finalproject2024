package com.project.project.entities.workplace.status;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum WorkplaceStatus {
    SUCCESS("Success operation."),
    WORKPLACE_NOT_FOUND("Workplace not found."),
    UNEXPECTED("An unexpected error occurred.");

    private final String message;
}