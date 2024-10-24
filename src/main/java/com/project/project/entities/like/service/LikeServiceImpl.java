package com.project.project.entities.like.service;

import com.project.project.entities.like.Like;
import com.project.project.entities.like.db.LikeRepository;
import com.project.project.entities.like.status.LikeStatus;
import com.project.project.exceptions.LikeNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;

    @Override
    public Like getLikeById(long id) {
        return likeRepository.findById(id)
                .orElseThrow(() -> new LikeNotFoundException(LikeStatus.LIKE_NOT_FOUND.getMessage()));
    }
}
