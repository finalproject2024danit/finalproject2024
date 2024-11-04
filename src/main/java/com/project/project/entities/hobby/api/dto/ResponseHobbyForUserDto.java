package com.project.project.entities.hobby.api.dto;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.dto.AbstractDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import static lombok.AccessLevel.PRIVATE;

@FieldDefaults(level = PRIVATE)
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseHobbyForUserDto extends AbstractDto {

    @JsonView(View.Admin.class)
    String language;

    @JsonView(View.Admin.class)
    String pet;

    @JsonView(View.Admin.class)
    String interest;

}
