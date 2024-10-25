package com.project.project.entities.friend.api;

import com.project.project.entities.friend.Friend;
import com.project.project.entities.friend.service.FriendServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add")
    public ResponseEntity<Friend> addFriend(@RequestParam long userFromId, @RequestParam long userToId) {
        log.info("Trying to add friend");

        Friend friend = friendService.addFriend(userFromId, userToId);
        return ResponseEntity.ok(friend);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFriend(@PathVariable Long id) {
        log.info("Trying to delete friend");

        friendService.deleteFriend(id);
        return ResponseEntity.ok("Friend has been successfully deleted.");
    }
}