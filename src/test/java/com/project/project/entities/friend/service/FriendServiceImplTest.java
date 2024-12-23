package com.project.project.entities.friend.service;

import com.project.project.entities.friend.db.FriendRepository;
import com.project.project.exceptions.UserNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import com.project.project.entities.friend.Friend;
import com.project.project.entities.user.User;
import com.project.project.entities.user.db.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FriendServiceImplTest {

    @Mock
    private FriendRepository friendRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private FriendServiceImpl friendService;

    private User user1;
    private User user2;
    private User user3;

    @BeforeEach
    void setUp() {
        user1 = new User();
        user1.setId(1L);
        user1.setFirstName("Alice");
        user1.setLastName("Smith");
        user1.setEmail("alice.smith@example.com");
        user1.setPassword("password123");
        user1.setEnabled(true);
        user1.setCreatedDate(LocalDateTime.now());
        user1.setLastModifiedDate(LocalDateTime.now());

        user2 = new User();
        user2.setId(2L);
        user2.setFirstName("Bob");
        user2.setLastName("Johnson");
        user2.setEmail("bob.johnson@example.com");
        user2.setPassword("password123");
        user2.setEnabled(true);
        user2.setCreatedDate(LocalDateTime.now());
        user2.setLastModifiedDate(LocalDateTime.now());

        user3 = new User();
        user3.setId(3L);
        user3.setFirstName("Alice");
        user3.setLastName("Brown");
        user3.setEmail("alice.brown@example.com");
        user3.setPassword("password123");
        user3.setEnabled(true);
        user3.setCreatedDate(LocalDateTime.now());
        user3.setLastModifiedDate(LocalDateTime.now());
    }

    @Test
    void findFriendsByNameExcludingSelf_FirstNameOnly() {
        List<Friend> mockFriends = List.of(new Friend(user1.getId(), user3.getId(), LocalDateTime.now(), LocalDateTime.now()));
        when(friendRepository.findFriendsByFirstNameExcludingSelf("Alice", user1.getId()))
                .thenReturn(mockFriends);

        List<Friend> result = friendService.findFriendsByNameExcludingSelf("Alice", "", user1.getId());
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(user3.getId(), result.get(0).getUserToId());
    }

    @Test
    void findFriendsByNameExcludingSelf_FirstAndLastName() {
        List<Friend> mockFriends = List.of(new Friend(user1.getId(), user3.getId(), LocalDateTime.now(), LocalDateTime.now()));
        when(friendRepository.findFriendsByFirstNameAndLastNameExcludingSelf("Alice", "Brown", user1.getId()))
                .thenReturn(mockFriends);

        List<Friend> result = friendService.findFriendsByNameExcludingSelf("Alice", "Brown", user1.getId());
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(user3.getId(), result.get(0).getUserToId());
    }

    @Test
    void addFriend() {
        when(userRepository.findById(user1.getId())).thenReturn(Optional.of(user1));
        when(userRepository.findById(user2.getId())).thenReturn(Optional.of(user2));

        Friend mockFriend = new Friend(user1.getId(), user2.getId(), LocalDateTime.now(), LocalDateTime.now());
        when(friendRepository.save(any(Friend.class))).thenReturn(mockFriend);

        Friend result = friendService.addFriend(user1.getId(), user2.getId());
        assertNotNull(result);
        assertEquals(user1.getId(), result.getUserFromId());
        assertEquals(user2.getId(), result.getUserToId());
    }

    @Test
    void deleteFriend() {
        when(userRepository.findById(user1.getId())).thenReturn(Optional.of(user1));
        when(userRepository.findById(user2.getId())).thenReturn(Optional.of(user2));

        assertDoesNotThrow(() -> friendService.deleteFriend(user1.getId(), user2.getId()));
        verify(friendRepository, times(1)).deleteFriend(user1.getId(), user2.getId());
    }
}