package com.project.project.entities.friend.api;

import org.junit.jupiter.api.Test;
import com.project.project.entities.friend.Friend;
import com.project.project.entities.friend.api.dto.RequestDeleteFriendDto;
import com.project.project.entities.friend.service.FriendServiceImpl;
import com.project.project.entities.user.User;
import com.project.project.entities.user.api.dto.ResponseUserDto;
import com.project.project.entities.user.api.dto.UserMapper;
import com.project.project.entities.user.service.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class FriendControllerTest {

    private MockMvc mockMvc;

    @Mock
    private FriendServiceImpl friendService;

    @Mock
    private UserServiceImpl userService;

    @InjectMocks
    private FriendController friendController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(friendController).build();
    }

    @Test
    void addFriend() {
        Friend friend = new Friend();
        friend.setUserFromId(100L);
        friend.setUserToId(200L);
        friend.setId(1L);
        friend.setCreatedDate(LocalDateTime.now());
        friend.setLastModifiedDate(LocalDateTime.now());

        when(friendService.addFriend(100L, 200L)).thenReturn(friend);

        ResponseEntity<Friend> response = friendController.addFriend(100L, 200L);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(friend, response.getBody());
        verify(friendService, times(1)).addFriend(100L, 200L);
    }

    @Test
    void deleteFriend() {
        RequestDeleteFriendDto dto = new RequestDeleteFriendDto(100L, 200L);

        doNothing().when(friendService).deleteFriend(dto.getUserFromId(), dto.getUserToId());

        ResponseEntity<String> response = friendController.deleteFriend(dto);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Friendship has been successfully deleted.", response.getBody());
        verify(friendService, times(1)).deleteFriend(100L, 200L);
    }

    @Test
    void searchFriendsByFullName() throws Exception {
        Friend friend = new Friend();
        friend.setUserFromId(200L);
        friend.setUserToId(100L);
        friend.setId(1L);
        friend.setCreatedDate(LocalDateTime.now());
        friend.setLastModifiedDate(LocalDateTime.now());

        when(friendService.findFriendsByNameExcludingSelf("Alice", "", 200L))
                .thenReturn(new ArrayList<>(List.of(friend)));

        User user = new User();
        user.setId(2L);
        user.setFirstName("Boris");

        when(userService.findAllById(new HashSet<>(Set.of(100L, 200L))))
                .thenReturn(new ArrayList<>(List.of(user)));

        mockMvc.perform(get("/api/v1/friends/search", 1L)
                        .param("currentUserId", "200")
                        .param("fullName", "Alice"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(2L))
                .andExpect(jsonPath("$[0].firstName").value("Boris"));

        verify(friendService, times(1)).findFriendsByNameExcludingSelf("Alice", "", 200L);
    }

}