package com.project.project.entities.residence.api.dto;

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
public class ResponseResidenceDto extends AbstractDto {
    @JsonView(View.Admin.class)
    Long id;

    @JsonView(View.Admin.class)
    String planet;

    @JsonView(View.Admin.class)
    String country;

    @JsonView(View.Admin.class)
    String city;

    @JsonView(com.project.project.entities.hobby.api.dto.View.Admin.class)
    LocalDateTime createdDate;

    @JsonView(com.project.project.entities.hobby.api.dto.View.Admin.class)
    LocalDateTime lastModifiedDate;
}
