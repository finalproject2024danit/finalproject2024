package com.project.project.entities.workplace.api.dto;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.dto.AbstractDto;
import com.project.project.entities.user.api.dto.ResponseUserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.FieldDefaults;

import java.util.Set;

import static lombok.AccessLevel.PRIVATE;


@FieldDefaults(level = PRIVATE)
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@Data
public class ResponseWorkplaceDto extends AbstractDto {

    @JsonView(View.Admin.class)
    Long id;

    @JsonView(View.Admin.class)
    String name;

    @JsonView(View.Admin.class)
    Set<ResponseUserDto> users;

}
