package com.project.project.entities.friend.service;

import com.project.project.entities.friend.Friend;
import com.project.project.entities.friend.db.FriendRepository;
import com.project.project.entities.user.db.UserRepository;
import com.project.project.entities.user.status.UserStatus;
import com.project.project.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    @Override
    public Friend addFriend(long userFromId, long userToId) {
        userRepository.findById(userFromId)
                .orElseThrow(() -> new UserNotFoundException(UserStatus.USER_NOT_FOUND.getMessage()));
        userRepository.findById(userToId)
                .orElseThrow(() -> new UserNotFoundException(UserStatus.USER_NOT_FOUND.getMessage()));

        Friend friend = new Friend();
        friend.setUserFromId(userFromId);
        friend.setUserToId(userToId);
        return friendRepository.save(friend);
    }

    @Override
    @Transactional
    public void deleteFriend(long userFromId, long userToId) {
        userRepository.findById(userFromId)
                .orElseThrow(() -> new UserNotFoundException(UserStatus.USER_NOT_FOUND.getMessage()));
        userRepository.findById(userToId)
                .orElseThrow(() -> new UserNotFoundException(UserStatus.USER_NOT_FOUND.getMessage()));

        friendRepository.deleteFriend(userFromId, userToId);
    }


    @Override
    public List<Friend> findFriendsByNameExcludingSelf(String firstName, String lastName, Long currentUserId) {
        if (lastName.isEmpty()) {
            return friendRepository.findFriendsByFirstNameExcludingSelf(firstName, currentUserId);
        } else {
            return friendRepository.findFriendsByFirstNameAndLastNameExcludingSelf(firstName, lastName, currentUserId);
        }
    }
}
