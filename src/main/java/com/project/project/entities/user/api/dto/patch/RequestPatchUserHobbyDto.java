package com.project.project.entities.user.api.dto.patch;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import static lombok.AccessLevel.PRIVATE;

@FieldDefaults(level = PRIVATE)
@EqualsAndHashCode()
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RequestPatchUserHobbyDto implements RequestPatchUserDto {

    @NotBlank(message = "Language must not be blank")
    String language;

    @NotBlank(message = "Pet must not be blank")
    String pet;

    @NotBlank(message = "Interest must not be blank")
    String interest;

}
