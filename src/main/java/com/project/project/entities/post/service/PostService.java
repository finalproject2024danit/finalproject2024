package com.project.project.entities.post.service;

import com.project.project.entities.post.Post;
import com.project.project.entities.user.User;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface PostService {
    Post getPostById(long id);

    Set<Post> getPostsByUserId(long userId);

    Post createPost(Post post);

    Post updatePost(long postId, Post post);

    void deletePost(long postId);
}
