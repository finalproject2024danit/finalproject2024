package com.project.project.entities.workplace.model;

import jakarta.validation.constraints.NotBlank;

public record AddWorkplaceModel(
        @NotBlank(message = "Name cannot be blank")
        String name) {
}
