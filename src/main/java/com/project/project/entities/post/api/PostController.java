package com.project.project.entities.post.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.entities.post.Post;
import com.project.project.entities.post.api.dto.PostMapper;
import com.project.project.entities.post.api.dto.RequestPostDto;
import com.project.project.entities.post.api.dto.ResponsePostDto;
import com.project.project.entities.post.api.dto.View;
import com.project.project.entities.post.service.PostServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

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
    public ResponseEntity<Set<ResponsePostDto>> getPostsByUserId(@PathVariable long userId) {
        log.info("Trying to get post by user id: {}", userId);
        Set<Post> posts = postService.getPostsByUserId(userId);

        Set<ResponsePostDto> listResponsePostDto = posts.stream()
                .map(PostMapper.INSTANCE::postToPostDto).collect(Collectors.toSet());

        return ResponseEntity.ok(listResponsePostDto);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponsePostDto> createPost(@RequestBody RequestPostDto requestPostDto) {
        log.info("Trying to create post");
        Post post = PostMapper.INSTANCE.requestPostDtoToPost(requestPostDto);

        Post createdPost = postService.createPost(post);

        ResponsePostDto responsePostDto = PostMapper.INSTANCE.postToPostDto(createdPost);

        return ResponseEntity.ok(responsePostDto);
    }

    @PatchMapping("/post/{id}")
    public ResponseEntity<ResponsePostDto> updatePostContent(@PathVariable long id, @RequestBody RequestPostDto requestPostDto) {
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