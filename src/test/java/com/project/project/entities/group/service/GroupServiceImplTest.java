package com.project.project.entities.group.service;

import com.project.project.entities.group.Group;
import com.project.project.entities.group.api.dto.ResponseGroupFullInfoDto;
import com.project.project.entities.group.db.GroupRepository;
import com.project.project.entities.group.status.GroupStatus;
import com.project.project.entities.post.Post;
import com.project.project.entities.post.api.dto.PostMapper;
import com.project.project.entities.post.api.dto.ResponsePostWithLikeCommentsSumDto;
import com.project.project.entities.user.User;
import com.project.project.entities.user.db.UserRepository;
import com.project.project.exceptions.GroupNotFoundException;
import com.project.project.exceptions.UserNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.PageImpl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GroupServiceImplTest {

    @Mock
    private GroupRepository groupRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PostMapper postMapper;

    @InjectMocks
    private GroupServiceImpl groupService;

    private Group group;
    private User user;

    @BeforeEach
    void setUp() {
        group = new Group();
        group.setId(1L);
        group.setName("Test Group");
        group.setIsOpen(true);
        group.setCreatedDate(LocalDateTime.now());
        group.setLastModifiedDate(LocalDateTime.now());
        group.setPosts(new ArrayList<>());
        group.setUsers(new HashSet<>());

        user = new User();
        user.setId(1L);
        user.setFirstName("John");
        user.setLastName("Doe");
    }

    @Test
    void getGroupById_Success() {
        when(groupRepository.findById(1L)).thenReturn(Optional.of(group));

        Group result = groupService.getGroupById(1L);

        assertNotNull(result);
        assertEquals("Test Group", result.getName());
        verify(groupRepository, times(1)).findById(1L);
    }

    @Test
    void getGroupById_GroupNotFound() {
        when(groupRepository.findById(1L)).thenReturn(Optional.empty());

        GroupNotFoundException exception = assertThrows(GroupNotFoundException.class, () -> {
            groupService.getGroupById(1L);
        });

        assertEquals(GroupStatus.GROUP_NOT_FOUND.getMessage(), exception.getMessage());
        verify(groupRepository, times(1)).findById(1L);
    }

    @Test
    void getGroupFullInfo_Success() {
        ResponsePostWithLikeCommentsSumDto postDto = new ResponsePostWithLikeCommentsSumDto();
        when(postMapper.postToPostWithLikesCommentsSumDto(any())).thenReturn(postDto);
        group.getPosts().add(new Post());
        when(groupRepository.findById(1L)).thenReturn(Optional.of(group));

        ResponseGroupFullInfoDto result = groupService.getGroupFullInfo(1L);

        assertNotNull(result);
        assertEquals("Test Group", result.getName());
        assertFalse(result.getPosts().isEmpty());
        verify(groupRepository, times(1)).findById(1L);
    }

    @Test
    void createGroup_Success() {
        when(groupRepository.save(group)).thenReturn(group);

        Group result = groupService.createGroup(group);

        assertNotNull(result);
        assertEquals("Test Group", result.getName());
        verify(groupRepository, times(1)).save(group);
    }

    @Test
    void deleteGroup_Success() {
        when(groupRepository.findById(1L)).thenReturn(Optional.of(group));
        doNothing().when(groupRepository).deleteById(1L);

        groupService.deleteGroup(1L);

        verify(groupRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteGroup_GroupNotFound() {
        when(groupRepository.findById(1L)).thenReturn(Optional.empty());

        GroupNotFoundException exception = assertThrows(GroupNotFoundException.class, () -> {
            groupService.deleteGroup(1L);
        });

        assertEquals(GroupStatus.GROUP_NOT_FOUND.getMessage(), exception.getMessage());
        verify(groupRepository, times(1)).findById(1L);
    }

    @Test
    void addUserToGroup_Success() {
        when(groupRepository.findById(1L)).thenReturn(Optional.of(group));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        groupService.addUserToGroup(1L, 1L);

        assertTrue(group.getUsers().contains(user));
        verify(groupRepository, times(1)).save(group);
    }

    @Test
    void addUserToGroup_GroupNotFound() {
        when(groupRepository.findById(1L)).thenReturn(Optional.empty());

        GroupNotFoundException exception = assertThrows(GroupNotFoundException.class, () -> {
            groupService.addUserToGroup(1L, 1L);
        });

        assertEquals(GroupStatus.GROUP_NOT_FOUND.getMessage(), exception.getMessage());
        verify(groupRepository, times(1)).findById(1L);
    }

    @Test
    void addUserToGroup_UserNotFound() {
        when(groupRepository.findById(1L)).thenReturn(Optional.of(group));
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            groupService.addUserToGroup(1L, 1L);
        });

        assertEquals("User not found.", exception.getMessage());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    public void searchGroupsByName_MoreThanTwoGroups() {
        List<Group> groups = List.of(new Group(), new Group(), new Group(), new Group());
        when(groupRepository.findByNameContaining("test")).thenReturn(groups);

        List<Group> result = groupService.searchGroupsByName("test");

        assertNotNull(result);
        assertEquals(4, result.size());

        verify(groupRepository, times(1)).findByNameContaining("test");
    }


    @Test
    void searchGroupsByName_NotFound() {
        when(groupRepository.findByNameContaining("Nonexistent")).thenReturn(List.of());

        GroupNotFoundException exception = assertThrows(GroupNotFoundException.class, () -> {
            groupService.searchGroupsByName("Nonexistent");
        });

        assertEquals(GroupStatus.GROUP_NOT_FOUND.getMessage(), exception.getMessage());
    }
}
