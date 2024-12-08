package com.project.project.entities.user.api.dto.patch;

import com.project.project.util.Gender;
import jakarta.validation.constraints.*;
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
public class RequestPatchUserGeneralInformationDto implements RequestPatchUserDto{
    @NotBlank(message = "First name must not be blank")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    String firstName;

    @NotBlank(message = "Last name must not be blank")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    String lastName;

    @NotBlank(message = "Email must not be blank")
    @Email(message = "Invalid email format")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    String email;

    @NotNull(message = "Last name must not be blank")
    Gender gender;

    @NotNull(message = "Date of birth must not be blank")
    Long dateOfBirth;

    @NotBlank(message = "Phone must not be blank")
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number format")
    String phones;

}
