package com.project.project.entities.like.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.entities.like.Like;
import com.project.project.entities.like.api.dto.LikeMapper;
import com.project.project.entities.like.api.dto.ResponseLikeDto;
import com.project.project.entities.like.service.LikeServiceImpl;
import com.project.project.entities.user.api.dto.View;
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
@RequestMapping("/api/v1/likes")
@RequiredArgsConstructor
public class LikeController {
    private final LikeServiceImpl likeService;

    @GetMapping("/like/{id}")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseLikeDto> getLikeById(@PathVariable long id) {
        log.info("Trying to get like by id: {}", id);

        Like like = likeService.getLikeById(id);

        ResponseLikeDto responseLikeDto = LikeMapper.INSTANCE.likeToResponseLikeDto(like);

        return ResponseEntity.ok(responseLikeDto);
    }

    @PostMapping("/liked")
    public ResponseEntity<ResponseLikeDto> likePost(@RequestParam Long postId, @RequestParam Long userId) {
        log.info("Trying to like post");

        Like like = likeService.addLike(postId, userId);

        ResponseLikeDto responseLikeDto = LikeMapper.INSTANCE.likeToResponseLikeDto(like);

        return ResponseEntity.ok(responseLikeDto);
    }

    @GetMapping("/like/post/{postId}")
    public ResponseEntity<List<ResponseLikeDto>> getLikesByPostId(
            @PathVariable long postId, @RequestParam(defaultValue = "0") int startPage,
            @RequestParam(defaultValue = "10") int perPage,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection) {
        log.info("Trying to get likes with pagination and sorting parameters by post id: {}", postId);

        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Pageable pageable = PageRequest.of(startPage, perPage, Sort.by(direction, sortBy));

        Page<Like> likesByPostId = likeService.getLikesByPostId(postId, pageable);

        List<ResponseLikeDto> responseLikesDto = likesByPostId.stream().map(LikeMapper.INSTANCE::likeToResponseLikeDto).toList();

        if (responseLikesDto.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(responseLikesDto);
    }
}