package com.project.project.entities.comment.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.entities.comment.Comment;
import com.project.project.entities.comment.service.CommentServiceImpl;
import com.project.project.entities.user.api.dto.View;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/api/v1/comments")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001",
}, allowedHeaders = "*")
@RequiredArgsConstructor
public class CommentController {
    private final CommentServiceImpl commentService;

    @GetMapping("/comment/{id}")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseCommentDto> getCommentById(@PathVariable long id) {
        log.info("Trying to get comment by id: {}", id);

        Comment comment = commentService.getCommentById(id);

        ResponseCommentDto responseCommentDto = CommentMapper.INSTANCE.commentToResponseCommentDto(comment);

        return ResponseEntity.ok(responseCommentDto);
    }
}