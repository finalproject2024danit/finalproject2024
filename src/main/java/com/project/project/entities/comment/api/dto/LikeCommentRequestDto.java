package com.project.project.entities.comment.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import static lombok.AccessLevel.PRIVATE;

@Data
@FieldDefaults(level = PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class LikeCommentRequestDto {

    @NotNull(message = "Comment ID must not be null.")
    Long commentId;

    @NotNull(message = "User ID must not be null.")
    Long userId;
}
