package com.project.project.entities.post.api;

import com.project.project.entities.post.service.PostServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/api/v1/posts")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001",
}, allowedHeaders = "*")
@RequiredArgsConstructor
public class PostController {
    private final PostServiceImpl postService;

}