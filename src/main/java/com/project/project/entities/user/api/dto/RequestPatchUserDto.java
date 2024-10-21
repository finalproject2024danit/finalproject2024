package com.project.project.entities.user.api.dto;

import com.project.project.entities.user.api.dto.validation.ValidPassword;
import com.project.project.util.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
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
public class RequestPatchUserDto {
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

    @NotBlank(message = "Password must not be blank")
    @ValidPassword
    String password;

    @NotBlank(message = "Gender must not be blank")
    @Size(max = 100, message = "Gender must not exceed 15 characters")
    Gender gender;

    @NotBlank(message = "Date of birth must not be blank")
    Long dateOfBirth;

    @NotBlank(message = "Avatar of birth must not be blank")
    String avatar;

    @NotBlank(message = "Phone must not be blank")
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number format")
    String phones;

    @NotBlank(message = "Photo data must not be blank")
    String photoData;

}
