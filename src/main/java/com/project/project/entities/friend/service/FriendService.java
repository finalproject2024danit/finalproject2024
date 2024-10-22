package com.project.project.entities.friend.service;

import com.project.project.entities.friend.Friend;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendService {
    Friend addFriend(long userFromId, long userToId);

    void deleteFriend(Long id);
}
