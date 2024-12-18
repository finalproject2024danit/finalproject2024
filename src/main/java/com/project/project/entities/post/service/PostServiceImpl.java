package com.project.project.entities.post.service;

import com.project.project.entities.post.Post;
import com.project.project.entities.post.api.dto.ResponsePostWithLikeCommentsSumDto;
import com.project.project.entities.post.db.PostRepository;
import com.project.project.entities.post.status.PostStatus;
import com.project.project.exceptions.PostNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
    public ResponsePostWithLikeCommentsSumDto getPostByIdWithTotalLikesComments(long id) {
        Post post = getPostById(id);

        int totalLikes = post.getLikes().size();
        int totalComments = post.getComments().size();

        return new ResponsePostWithLikeCommentsSumDto(
                post.getId(),
                post.getUserId(),
                post.getContent(),
                post.getGroup().getId(),
                totalLikes,
                totalComments,
                post.getCreatedDate(),
                post.getLastModifiedDate()
        );
    }

    @Override
    public Page<Post> getPostsByUserId(long userId, Pageable pageable) {
        return postRepository.getPostsByUserId(userId, pageable);
    }

    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post patchPost(long id, String postContent) {
        Post post = getPostById(id);
        post.setContent(postContent);
        return postRepository.save(post);
    }

    @Override
    public void deletePost(long id) {
        if (!postRepository.existsById(id)) {
            throw new PostNotFoundException(PostStatus.POST_NOT_FOUND.getMessage());
        }
        postRepository.deleteById(id);
    }

}
