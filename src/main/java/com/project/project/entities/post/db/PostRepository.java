package com.project.project.entities.post.db;

import com.project.project.entities.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
