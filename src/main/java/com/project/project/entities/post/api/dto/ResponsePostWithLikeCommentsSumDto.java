package com.project.project.entities.post.api.dto;

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
public class ResponsePostWithLikeCommentsSumDto extends AbstractDto {
    @JsonView(View.Admin.class)
    Long id;

    @JsonView(View.Admin.class)
    Long userId;

    @JsonView(View.Admin.class)
    String content;

    @JsonView(View.Admin.class)
    Long groupId;

    @JsonView(View.Admin.class)
    int totalLikes;

    @JsonView(View.Admin.class)
    int totalComments;

    @JsonView(View.Admin.class)
    LocalDateTime createdDate;

    @JsonView(View.Admin.class)
    LocalDateTime lastModifiedDate;
}
