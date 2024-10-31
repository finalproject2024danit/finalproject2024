package com.project.project.entities.user.api.dto;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.dto.AbstractDto;
import com.project.project.entities.residence.api.ResponseResidenceForUserDto;
import com.project.project.util.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PRIVATE;


@FieldDefaults(level = PRIVATE)
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseUserAllDataDto extends AbstractDto {
    @JsonView(View.Admin.class)
    Long id;

    @JsonView(View.Admin.class)
    String firstName;

    @JsonView(View.Admin.class)
    String lastName;

    @JsonView(View.Admin.class)
    String email;

    @JsonView(View.Admin.class)
    Gender gender;

    @JsonView(View.Admin.class)
    Long dateOfBirth;

    @JsonView(View.Admin.class)
    String avatar;

    @JsonView(View.Admin.class)
    String phones;

    @JsonView(View.Admin.class)
    String photoData;

    @JsonView(View.Admin.class)
    String workplace;

    @JsonView(View.Admin.class)
    ResponseResidenceForUserDto residence;

    @JsonView(View.Admin.class)
    LocalDateTime createdDate;

    @JsonView(View.Admin.class)
    LocalDateTime lastModifiedDate;

}
