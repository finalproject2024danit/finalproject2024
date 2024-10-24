package com.project.project.entities.like.service;

import com.project.project.entities.like.Like;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeService {
    Like getLikeById(long id);
}
