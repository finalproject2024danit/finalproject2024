package com.project.project.entities.friend.service;

import com.project.project.entities.friend.Friend;
import com.project.project.entities.friend.db.FriendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {

    private final FriendRepository friendRepository;

    public Friend addFriend(long userFromId, long userToId) {
        Friend friend = new Friend();
        friend.setUserFromId(userFromId);
        friend.setUserToId(userToId);
        return friendRepository.save(friend);
    }

    public void deleteFriend(Long id) {
        friendRepository.deleteById(id);
    }
}
