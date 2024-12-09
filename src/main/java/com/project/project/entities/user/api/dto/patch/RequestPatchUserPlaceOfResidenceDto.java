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
public class RequestPatchUserPlaceOfResidenceDto implements RequestPatchUserDto {

    @NotBlank(message = "Planet must not be blank")
    String planet;

    @NotBlank(message = "Country must not be blank")
    String country;

    @NotBlank(message = "City must not be blank")
    String city;

}
