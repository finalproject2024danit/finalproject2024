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
public class RequestPatchUserWorkplaceDto implements RequestPatchUserDto {

    @NotBlank(message = "Name must not be blank")
    String name;

}
