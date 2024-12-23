package com.project.project.entities.friend.db;

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

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@ActiveProfiles("local")
class FriendRepositoryTest {

    @Autowired
    private FriendRepository friendRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EntityManager entityManager;

    private User user1;
    private User user2;
    private User user3;

    @BeforeEach
    void setUp() {
        user1 = new User();
        user1.setFirstName("Alice");
        user1.setLastName("Smith");
        user1.setEmail("alice.smith@example.com");
        user1.setPassword("password123");
        user1.setEnabled(true);
        user1.setCreatedDate(LocalDateTime.now());
        user1.setLastModifiedDate(LocalDateTime.now());
        userRepository.save(user1);

        user2 = new User();
        user2.setFirstName("Bob");
        user2.setLastName("Johnson");
        user2.setEmail("bob.johnson@example.com");
        user2.setPassword("password123");
        user2.setEnabled(true);
        user2.setCreatedDate(LocalDateTime.now());
        user2.setLastModifiedDate(LocalDateTime.now());
        userRepository.save(user2);

        user3 = new User();
        user3.setFirstName("Alice");
        user3.setLastName("Brown");
        user3.setEmail("alice.brown@example.com");
        user3.setPassword("password123");
        user3.setEnabled(true);
        user3.setCreatedDate(LocalDateTime.now());
        user3.setLastModifiedDate(LocalDateTime.now());
        userRepository.save(user3);

        Friend friendship1 = new Friend(user1.getId(), user2.getId(), LocalDateTime.now(), LocalDateTime.now());
        friendRepository.save(friendship1);

        Friend friendship2 = new Friend(user1.getId(), user3.getId(), LocalDateTime.now(), LocalDateTime.now());
        friendRepository.save(friendship2);

        entityManager.flush();
        entityManager.clear();

        System.out.println("user1id = " + user1.getId());

        System.out.println("user2id = " + user2.getId());

        System.out.println("user3id = " + user3.getId());
    }

    @Test
    void findFriendsByFirstNameExcludingSelf() {
        List<Friend> friends = friendRepository.findFriendsByFirstNameExcludingSelf("Alice", user1.getId());
        friends.stream().forEach(x -> System.out.println(x.getUserFromId() + " " + x.getUserToId()));
        //method finds all friendships with name alice, but probably needs to find friends (of user with given id) with name alice
        assertNotNull(friends);
        assertEquals(1, friends.size());
        assertEquals(user3.getId(), friends.get(0).getUserToId());
    }

    @Test
    void findFriendsByFirstNameAndLastNameExcludingSelf() {
        List<Friend> friends = friendRepository.findFriendsByFirstNameAndLastNameExcludingSelf("Alice", "Brown", user1.getId());
        //finds all friendships with alice brown, intended behaviour?
        assertNotNull(friends);
        assertEquals(1, friends.size());
        assertEquals(user3.getId(), friends.get(0).getUserToId());
    }

    @Test
    void deleteFriend() {
        int sizeOfAll = friendRepository.findAll().size();

        friendRepository.deleteFriend(user1.getId(), user2.getId());
        entityManager.flush();
        entityManager.clear();

        List<Friend> remainingFriends = friendRepository.findAll();
        assertNotNull(remainingFriends);

        assertEquals(remainingFriends.size(), sizeOfAll - 1);
    }
}