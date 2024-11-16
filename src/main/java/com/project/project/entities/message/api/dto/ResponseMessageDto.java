package com.project.project.entities.message.api.dto;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.dto.AbstractDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.FieldDefaults;

import static lombok.AccessLevel.PRIVATE;


@FieldDefaults(level = PRIVATE)
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@Data
public class ResponseMessageDto extends AbstractDto {

    @JsonView(View.Admin.class)
    Long userFromId;

    @JsonView(View.Admin.class)
    String content;

}
