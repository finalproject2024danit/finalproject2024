package com.project.project.entities.post.service;

import com.project.project.entities.post.Post;

import java.util.Set;


public interface PostService {
    Post getPostById(long id);

    Set<Post> getPostsByUserId(long userId);

    Post createPost(Post post);

    Post patchPost(long postId, String postContent);

    void deletePost(long postId);
}
