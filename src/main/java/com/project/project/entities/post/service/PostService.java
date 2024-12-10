package com.project.project.entities.post.service;

import com.project.project.entities.post.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface PostService {
    Post getPostById(long id);

    Page<Post> getPostsByUserId(long userId, Pageable pageable);

    Post createPost(Post post);

    Post patchPost(long postId, String postContent);

    void deletePost(long postId);
}
