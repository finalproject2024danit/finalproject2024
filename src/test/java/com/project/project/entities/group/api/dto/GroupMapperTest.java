package com.project.project.entities.group.api.dto;

import com.project.project.entities.group.Group;
import com.project.project.entities.post.Post;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class GroupMapperTest {

    private final GroupMapper groupMapper = GroupMapper.INSTANCE;

    @Test
    void groupToResponseGroupDTO() {
        Group group = new Group();
        group.setId(1L);
        group.setName("Test Group");
        group.setIsOpen(true);
        group.setPhoto("group_photo_url");
        group.setCreatedDate(LocalDateTime.now());
        group.setLastModifiedDate(LocalDateTime.now());

        ResponseGroupDto responseGroupDto = groupMapper.groupToResponseGroupDTO(group);

        assertNotNull(responseGroupDto);
        assertEquals(1L, responseGroupDto.getId());
        assertEquals("Test Group", responseGroupDto.getName());
        assertTrue(responseGroupDto.getIsOpen());
        assertEquals("group_photo_url", responseGroupDto.getPhoto());
        assertNotNull(responseGroupDto.getCreatedDate());
        assertNotNull(responseGroupDto.getLastModifiedDate());
    }

    @Test
    void groupToResponseGroupFullInfoDTO() {
        Group group = new Group();
        group.setId(1L);
        group.setName("Test Group");
        group.setIsOpen(true);
        group.setPhoto("group_photo_url");
        group.setCreatedDate(LocalDateTime.now());
        group.setLastModifiedDate(LocalDateTime.now());

        Post post1 = new Post();
        post1.setId(1L);
        Post post2 = new Post();
        post2.setId(2L);
        group.setPosts(Arrays.asList(post1, post2));

        ResponseGroupFullInfoDto responseGroupFullInfoDto = groupMapper.groupToResponseGroupFullInfoDTO(group);

        assertNotNull(responseGroupFullInfoDto);
        assertEquals(1L, responseGroupFullInfoDto.getId());
        assertEquals("Test Group", responseGroupFullInfoDto.getName());
        assertTrue(responseGroupFullInfoDto.getIsOpen());
        assertEquals("group_photo_url", responseGroupFullInfoDto.getPhoto());
        assertEquals(2, responseGroupFullInfoDto.getPosts().size());
        assertNotNull(responseGroupFullInfoDto.getCreatedDate());
        assertNotNull(responseGroupFullInfoDto.getLastModifiedDate());
    }

    @Test
    void requestGroupDtoToGroup() {
        RequestGroupDto requestGroupDto = new RequestGroupDto();
        requestGroupDto.setName("Test Group");
        requestGroupDto.setIsOpen(true);

        Group group = groupMapper.requestGroupDtoToGroup(requestGroupDto);

        assertNotNull(group);
        assertEquals("Test Group", group.getName());
        assertTrue(group.getIsOpen());
        assertNull(group.getPhoto());
        assertNull(group.getPosts());
        assertNull(group.getCreatedDate());
        assertNull(group.getLastModifiedDate());
    }
}
