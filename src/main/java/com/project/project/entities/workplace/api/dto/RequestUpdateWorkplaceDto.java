package com.project.project.entities.workplace.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import static lombok.AccessLevel.PRIVATE;

@FieldDefaults(level = PRIVATE)
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RequestUpdateWorkplaceDto {

    @NotNull(message = "User ID must not be null")
    Long userId;

    @NotNull(message = "Workplace ID must not be null")
    Long id;

    @NotBlank(message = "Workplace name must not be blank")
    String name;
}
