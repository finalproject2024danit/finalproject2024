package com.project.project.entities.like.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.entities.like.Like;
import com.project.project.entities.like.api.dto.LikeMapper;
import com.project.project.entities.like.api.dto.ResponseLikeDto;
import com.project.project.entities.like.service.LikeServiceImpl;
import com.project.project.entities.user.api.dto.View;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/api/v1/likes")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001",
}, allowedHeaders = "*")
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
}