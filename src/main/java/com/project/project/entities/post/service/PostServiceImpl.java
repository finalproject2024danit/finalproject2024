package com.project.project.entities.post.service;

import com.project.project.entities.post.Post;
import com.project.project.entities.post.db.PostRepository;
import com.project.project.entities.post.status.PostStatus;
import com.project.project.exceptions.PostNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Override
    public Post getPostById(long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(PostStatus.POST_NOT_FOUND.getMessage()));
    }

    @Override
    public Set<Post> getPostsByUserId(long userId) {
        return postRepository.getPostsByUserId(userId);
    }

    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post patchPost(long id, String postContent) {
        Post post = getPostById(id);
        post.setContent(postContent);
        return post;
    }

    @Override
    public void deletePost(long id) {
        if (!postRepository.existsById(id)) {
            throw new PostNotFoundException(PostStatus.POST_NOT_FOUND.getMessage());
        }
        postRepository.deleteById(id);
    }

}
