package com.project.project.entities.residence.status;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ResidenceStatus {
    SUCCESS("Success operation."),
    RESIDENCE_NOT_FOUND("Residence not found."),
    UNEXPECTED("An unexpected error occurred.");

    private final String message;
}
