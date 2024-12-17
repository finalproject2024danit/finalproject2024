package com.project.project.entities.like.db;

import com.project.project.entities.like.Like;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LikeRepository extends JpaRepository<Like, Long> {

    @Query(value = "SELECT * FROM comment_likes WHERE comment_id = :commentId AND user_id = :userId", nativeQuery = true)
    Like findByCommentIdAndUserId(Long commentId, Long userId);

    @Query(value = "SELECT * FROM likes WHERE post_id = :postId AND user_id = :userId", nativeQuery = true)
    Like findByPostIdAndUserId(Long postId, Long userId);

    Page<Like> findByPostId(Long postId, Pageable pageable);
}
