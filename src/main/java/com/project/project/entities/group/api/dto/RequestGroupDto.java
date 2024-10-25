package com.project.project.entities.group.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class RequestGroupDto {

    @NotBlank(message = "Email must not be blank")
    @Size(max = 255, message = "Name must not exceed 255 characters")
    String name;

    @NotNull(message = "Group open status must not be null")
    private Boolean isOpen;
}
