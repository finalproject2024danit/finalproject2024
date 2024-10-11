package com.project.project.entities.user.model;

import com.project.project.util.Gender;
import jakarta.validation.constraints.NotBlank;

public record AddUserModel(
        @NotBlank(message = "First name cannot be blank")
        String firstName,

        @NotBlank(message = "Last name cannot be blank")
        String lastName,

        @NotBlank(message = "Email cannot be blank")
        String email,

        @NotBlank(message = "Password cannot be blank")
        String password,

        Gender gender,

        Long dateOfBirth,

        String avatar,

        String phones,

        String photoData
) {
}