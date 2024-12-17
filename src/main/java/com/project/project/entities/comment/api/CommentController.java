package com.project.project.entities.comment.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.entities.comment.Comment;
import com.project.project.entities.comment.api.dto.CommentMapper;
import com.project.project.entities.comment.api.dto.LikeCommentRequestDto;
import com.project.project.entities.comment.api.dto.RequestCommentDto;
import com.project.project.entities.comment.api.dto.ResponseCommentDto;
import com.project.project.entities.comment.service.CommentServiceImpl;
import com.project.project.entities.comment.status.CommentStatus;
import com.project.project.entities.user.api.dto.View;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/v1/comments")
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

    @PostMapping("/comment/create")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseCommentDto> createComment(@RequestBody RequestCommentDto requestCommentDto) {
        log.info("Trying to create comment");

        Comment comment = CommentMapper.INSTANCE.requestCommentDtoToComment(requestCommentDto);

        Comment savedComment = commentService.createComment(comment);

        ResponseCommentDto responseCommentDto = CommentMapper.INSTANCE.commentToResponseCommentDto(savedComment);

        return ResponseEntity.ok(responseCommentDto);
    }

    @GetMapping("/comment/delete/{id}")
    @JsonView(View.Admin.class)
    public ResponseEntity<String> deleteCommentById(@PathVariable long id) {
        log.info("Trying to delete comment by id: {}", id);

        commentService.deleteCommentById(id);

        return ResponseEntity.ok("Comment was successfully deleted");
    }

    @PostMapping("/like")
    public ResponseEntity<String> likeComment(@Valid @RequestBody LikeCommentRequestDto likeCommentRequestDto) {
        log.info("Trying to like comment");

        commentService.likeComment(likeCommentRequestDto.getCommentId(), likeCommentRequestDto.getUserId());
        return ResponseEntity.ok(CommentStatus.LIKED_SUCCESSFULLY.getMessage());
    }

    @GetMapping("/comment/post/{postId}")
    public ResponseEntity<List<ResponseCommentDto>> getCommentsByPostId(
            @PathVariable long postId, @RequestParam(defaultValue = "0") int startPage,
            @RequestParam(defaultValue = "10") int perPage,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection) {
        log.info("Trying to get comments with pagination and sorting parameters by post id: {}", postId);

        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Pageable pageable = PageRequest.of(startPage, perPage, Sort.by(direction, sortBy));

        Page<Comment> commentsByPostId = commentService.getCommentsByPostId(postId, pageable);

        List<ResponseCommentDto> responseCommentsDto = commentsByPostId.stream().map(CommentMapper.INSTANCE::commentToResponseCommentDto).toList();

        return ResponseEntity.ok(responseCommentsDto);
    }
}