package com.project.project.entities.post.db;

import com.project.project.entities.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("SELECT p FROM Post p WHERE p.userId = :userId")
    Set<Post> getPostsByUserId(@Param("userId") long userId);
}
