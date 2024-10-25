package com.project.project.entities.comment.api;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LikeCommentRequestDto {

    @NotNull(message = "Comment ID must not be null.")
    private Long commentId;

    @NotNull(message = "User ID must not be null.")
    private Long userId;
}
