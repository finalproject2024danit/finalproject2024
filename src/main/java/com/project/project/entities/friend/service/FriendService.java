package com.project.project.entities.friend.service;

import com.project.project.entities.friend.Friend;

import java.util.List;

public interface FriendService {
    Friend addFriend(long userFromId, long userToId);

    void deleteFriend(long userFromId, long userToId);

    List<Friend> findFriendsByNameExcludingSelf(String firstName, String lastName, Long currentUserId);
}
