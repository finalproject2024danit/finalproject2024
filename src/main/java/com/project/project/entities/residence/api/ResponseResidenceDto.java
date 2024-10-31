package com.project.project.entities.residence.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.dto.AbstractDto;
import com.project.project.entities.user.api.dto.View;
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
public class ResponseResidenceDto extends AbstractDto {
    @JsonView(View.Admin.class)
    String planet;

    @JsonView(View.Admin.class)
    String country;

    @JsonView(View.Admin.class)
    String city;
}
