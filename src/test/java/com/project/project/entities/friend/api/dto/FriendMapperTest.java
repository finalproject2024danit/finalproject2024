package com.project.project.entities.friend.api.dto;

import org.junit.jupiter.api.Test;
import com.project.project.entities.friend.Friend;
import static org.junit.jupiter.api.Assertions.*;

class FriendMapperTest {

    private final FriendMapper friendMapper = FriendMapper.INSTANCE;

    @Test
    void friendToFriendDto() {
        Friend friend = new Friend();
        friend.setId(1L);
        friend.setUserFromId(100L);
        friend.setUserToId(200L);

        ResponseFriendDto responseDto = friendMapper.friendToFriendDto(friend);

        assertNotNull(responseDto);
        assertEquals(friend.getId(), responseDto.getId());
        assertEquals(friend.getUserFromId(), responseDto.getUserFromId());
        assertEquals(friend.getUserToId(), responseDto.getUserToId());
    }

    @Test
    void friendToFriendDtoWithNull() {
        ResponseFriendDto responseDto = friendMapper.friendToFriendDto(null);

        assertNull(responseDto);
    }
}