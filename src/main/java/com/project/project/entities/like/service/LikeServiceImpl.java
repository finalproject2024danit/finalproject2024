package com.project.project.entities.like.service;

import com.project.project.entities.like.Like;
import com.project.project.entities.like.db.LikeRepository;
import com.project.project.entities.like.status.LikeStatus;
import com.project.project.entities.post.Post;
import com.project.project.entities.post.db.PostRepository;
import com.project.project.entities.post.status.PostStatus;
import com.project.project.exceptions.LikeNotFoundException;
import com.project.project.exceptions.PostNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;
    private final PostRepository postRepository;

    @Override
    public Like getLikeById(long id) {
        return likeRepository.findById(id)
                .orElseThrow(() -> new LikeNotFoundException(LikeStatus.LIKE_NOT_FOUND.getMessage()));
    }

    @Override
    public Like addLike(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(PostStatus.POST_NOT_FOUND.getMessage()));

        Like existingLike = likeRepository.findByPostIdAndUserId(postId, userId);
        if (existingLike != null) {
            likeRepository.delete(existingLike);
            return existingLike;
        } else {
            Like like = new Like();
            like.setPost(post);
            like.setUserId(userId);
            return likeRepository.save(like);
        }
    }

    @Override
    public Page<Like> getLikesByPostId(long postId, Pageable pageable) {
        return likeRepository.findByPostId(postId, pageable);
    }
}
