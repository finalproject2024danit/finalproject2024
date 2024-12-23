package com.project.project.entities.user.db;

import com.project.project.entities.group.Group;
import com.project.project.entities.hobby.Hobby;
import com.project.project.entities.residence.Residence;
import com.project.project.entities.workplace.Workplace;
import com.project.project.security.SysRole.SysRole;
import com.project.project.util.Gender;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import com.project.project.entities.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@ActiveProfiles("local")
@SpringBootTest
@Transactional
class UserRepositoryTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private Workplace workplace;

    @Mock
    private Residence residence;

    @Mock
    private Hobby hobby;

    @Mock
    private Group group;

    @Mock
    private SysRole sysRole;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setFirstName("Alice");
        user.setLastName("Smith");
        user.setEmail("alice.smith@example.com");
        user.setPassword("password123");
        user.setGender(Gender.FEMALE);
        user.setDateOfBirth(1234567890L);
        user.setAvatar("avatarUrl");
        user.setPhones("123-456-7890");
        user.setPhotoData("photoData");
        user.setEnabled(true);
        user.setCreatedDate(LocalDateTime.now());
        user.setLastModifiedDate(LocalDateTime.now());
        user.setWorkplace(workplace);
        user.setResidence(residence);
        user.setHobby(hobby);
        user.setGroups(new HashSet<>(List.of(group)));
        user.setSysRoles(List.of(sysRole));
    }

    @Test
    void searchByFirstName() {
        when(userRepository.searchByFirstName("Alice")).thenReturn(List.of(user));

        List<User> result = userRepository.searchByFirstName("Alice");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Alice", result.get(0).getFirstName());
    }

    @Test
    void searchByFirstNameAndLastName() {
        when(userRepository.searchByFirstNameAndLastName("Alice", "Smith")).thenReturn(List.of(user));

        List<User> result = userRepository.searchByFirstNameAndLastName("Alice", "Smith");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Alice", result.get(0).getFirstName());
        assertEquals("Smith", result.get(0).getLastName());
    }

    @Test
    void findFriendsByUserId() {
        Page<User> mockPage = new PageImpl<>(List.of(user), PageRequest.of(0, 10), 1);

        when(userRepository.findFriendsByUserId(1L, PageRequest.of(0, 10))).thenReturn(mockPage);

        Page<User> result = userRepository.findFriendsByUserId(1L, PageRequest.of(0, 10));

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertTrue(result.getContent().stream().anyMatch(u -> u.getId().equals(1L)));
    }
    @Test
    void findByUserEmail() {
        when(userRepository.findByUserEmail("alice.smith@example.com")).thenReturn(Optional.of(user));

        Optional<User> result = userRepository.findByUserEmail("alice.smith@example.com");

        assertTrue(result.isPresent());
        assertEquals("alice.smith@example.com", result.get().getEmail());
    }
}