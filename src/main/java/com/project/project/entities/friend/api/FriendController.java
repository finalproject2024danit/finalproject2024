package com.project.project.entities.friend.api;

import com.project.project.entities.friend.Friend;
import com.project.project.entities.friend.api.dto.RequestDeleteFriendDto;
import com.project.project.entities.friend.service.FriendServiceImpl;
import com.project.project.entities.user.User;
import com.project.project.entities.user.api.dto.ResponseUserDto;
import com.project.project.entities.user.api.dto.UserMapper;
import com.project.project.entities.user.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Log4j2
@RestController
@RequestMapping("/api/v1/friends")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001",
}, allowedHeaders = "*")
@RequiredArgsConstructor
public class FriendController {
    private final FriendServiceImpl friendService;
    private final UserServiceImpl userService;

    @PostMapping("/add")
    public ResponseEntity<Friend> addFriend(@RequestParam long userFromId, @RequestParam long userToId) {
        log.info("Trying to add friend");

        Friend friend = friendService.addFriend(userFromId, userToId);
        return ResponseEntity.ok(friend);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFriend(@RequestBody RequestDeleteFriendDto requestDeleteFriendDto) {
        Long idFrom = requestDeleteFriendDto.getUserFromId();
        Long idTo = requestDeleteFriendDto.getUserToId();
        log.info("Trying to delete friendship between user {} and user {}",
                idFrom, idTo);

        friendService.deleteFriend(idFrom, idTo);
        return ResponseEntity.ok("Friendship has been successfully deleted.");
    }


    @GetMapping("/search")
    public List<ResponseUserDto> searchFriendsByFullName(
            @RequestParam Long currentUserId,
            @RequestParam String fullName) {

        log.info("Find friends by first and/or lastName: {}", currentUserId);
        String[] nameParts = fullName.trim().split("\\s+");
        String firstName = nameParts[0];
        String lastName = nameParts.length > 1 ? nameParts[1] : "";

        List<Friend> friends;
        if (lastName.isEmpty()) {
            friends = friendService.findFriendsByNameExcludingSelf(firstName, "", currentUserId);
        } else {
            friends = friendService.findFriendsByNameExcludingSelf(firstName, lastName, currentUserId);
        }

        Set<Long> userIds = new HashSet<>();
        for (Friend friend : friends) {
            userIds.add(friend.getUserFromId());
            userIds.add(friend.getUserToId());
        }

        List<User> users = userService.findAllById(userIds);

        users.removeIf(user -> user.getId().equals(currentUserId));

        return users.stream()
                .map(UserMapper.INSTANCE::userToUserDto)
                .toList();
    }
}