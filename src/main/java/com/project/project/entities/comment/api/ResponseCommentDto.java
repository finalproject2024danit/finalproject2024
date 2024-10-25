package com.project.project.entities.comment.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.dto.AbstractDto;
import com.project.project.entities.like.api.dto.ResponseLikeDto;
import com.project.project.entities.user.api.dto.View;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

import static lombok.AccessLevel.PRIVATE;


@FieldDefaults(level = PRIVATE)
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseCommentDto extends AbstractDto {

    @JsonView(View.Admin.class)
    Long id;

    @JsonView(View.Admin.class)
    Long postId;

    @JsonView(View.Admin.class)
    Set<ResponseLikeDto> likes;

    @JsonView(View.Admin.class)
    Long userId;

    @JsonView(View.Admin.class)
    String content;

    @JsonView(View.Admin.class)
    LocalDateTime createdDate;

    @JsonView(View.Admin.class)
    LocalDateTime lastModifiedDate;
}
