package com.project.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.user.api.dto.View;
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
public class BaseResponseDto<T extends AbstractDto> {
    @JsonView(View.Admin.class)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    T dto;

    @JsonView(View.Admin.class)
    String message;
}
