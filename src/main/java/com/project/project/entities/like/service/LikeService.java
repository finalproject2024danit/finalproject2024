package com.project.project.entities.like.service;

import com.project.project.entities.like.Like;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeService {
    Like getLikeById(long id);

    Like addLike(Long postId, Long userId);

    Page<Like> getLikesByPostId(long postId, Pageable pageable);
}
