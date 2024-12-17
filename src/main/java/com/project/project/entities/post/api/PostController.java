package com.project.project.entities.post.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.entities.post.Post;
import com.project.project.entities.post.api.dto.PostMapper;
import com.project.project.entities.post.api.dto.RequestPostDto;
import com.project.project.entities.post.api.dto.ResponsePostDto;
import com.project.project.entities.post.api.dto.View;
import com.project.project.entities.post.service.PostServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostServiceImpl postService;

    @GetMapping("/post/{id}")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponsePostDto> getPostById(@PathVariable long id) {
        log.info("Trying to get post by id: {}", id);
        Post post = postService.getPostById(id);

        ResponsePostDto responsePostDto = PostMapper.INSTANCE.postToPostDto(post);

        return ResponseEntity.ok(responsePostDto);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<ResponsePostDto>> getPostsByUserId(
            @PathVariable long userId,
            @RequestParam(defaultValue = "0") int startPage,
            @RequestParam(defaultValue = "10") int perPage,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection) {

        log.info("Trying to get posts by user ID: {}, with pagination parameters", userId);

        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Pageable pageable = PageRequest.of(startPage, perPage, Sort.by(direction, sortBy));

        Page<Post> posts = postService.getPostsByUserId(userId, pageable);

        Page<ResponsePostDto> responsePostsDto = posts.map(PostMapper.INSTANCE::postToPostDto);

        return ResponseEntity.ok(responsePostsDto);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponsePostDto> createPost(@Valid @RequestBody RequestPostDto requestPostDto) {
        log.info("Trying to create post");
        Post post = PostMapper.INSTANCE.requestPostDtoToPost(requestPostDto);

        Post createdPost = postService.createPost(post);

        ResponsePostDto responsePostDto = PostMapper.INSTANCE.postToPostDto(createdPost);

        return ResponseEntity.ok(responsePostDto);
    }

    @PatchMapping("/post/{id}")
    public ResponseEntity<ResponsePostDto> updatePostContent(@PathVariable long id, @Valid @RequestBody RequestPostDto requestPostDto) {
        log.info("Trying to patch post id: {}", id);

        Post post = postService.patchPost(id, requestPostDto.getContent());

        ResponsePostDto responsePostDto = PostMapper.INSTANCE.postToPostDto(post);

        return ResponseEntity.ok(responsePostDto);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePost(@PathVariable long id) {
        log.info("Trying to delete post id: {}", id);

        postService.deletePost(id);
        return ResponseEntity.ok("Post was deleted with id: " + id);
    }

}