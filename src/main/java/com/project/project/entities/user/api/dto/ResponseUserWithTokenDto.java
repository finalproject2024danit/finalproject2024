package com.project.project.entities.user.api.dto;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.dto.AbstractDto;
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
public class ResponseUserWithTokenDto extends AbstractDto {
    @JsonView(View.Admin.class)
    String type;

    @JsonView(View.Admin.class)
    String accessToken;

    @JsonView(View.Admin.class)
    String refreshToken;

    @JsonView(View.Admin.class)
    Long id;

    @JsonView(View.Admin.class)
    String firstName;

    @JsonView(View.Admin.class)
    String lastName;

    @JsonView(View.Admin.class)
    String email;

    @JsonView(View.Admin.class)
    LocalDateTime createdDate;

    @JsonView(View.Admin.class)
    LocalDateTime lastModifiedDate;
}
