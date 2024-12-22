package com.project.project.entities.group.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.project.entities.group.Group;
import com.project.project.entities.group.api.dto.*;
import com.project.project.entities.group.service.GroupServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class GroupControllerTest {

    private MockMvc mockMvc;

    @Mock
    private GroupServiceImpl groupService;

    @InjectMocks
    private GroupController groupController;

    private Group group;
    private RequestGroupDto requestGroupDto;
    private ResponseGroupDto responseGroupDto;
    private ResponseGroupFullInfoDto responseGroupFullInfoDto;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(groupController).build();

        group = new Group();
        group.setId(1L);
        group.setName("Test Group");

        requestGroupDto = new RequestGroupDto();
        requestGroupDto.setName("Test Group");

        responseGroupDto = new ResponseGroupDto();
        responseGroupDto.setId(1L);
        responseGroupDto.setName("Test Group");

        responseGroupFullInfoDto = new ResponseGroupFullInfoDto();
        responseGroupFullInfoDto.setId(1L);
        responseGroupFullInfoDto.setName("Test Group");
    }

    @Test
    void getGroupById() throws Exception {
        when(groupService.getGroupFullInfo(1L)).thenReturn(responseGroupFullInfoDto);

        mockMvc.perform(get("/api/v1/groups/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Test Group"));

        verify(groupService, times(1)).getGroupFullInfo(1L);
    }

    @Test
    void createGroup() throws Exception {
        when(groupService.createGroup(any(Group.class))).thenReturn(group);

        mockMvc.perform(post("/api/v1/groups")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestGroupDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Test Group"));

        verify(groupService, times(1)).createGroup(any(Group.class));
    }

    @Test
    void deleteGroup() throws Exception {
        doNothing().when(groupService).deleteGroup(1L);

        mockMvc.perform(delete("/api/v1/groups/{id}", 1L))
                .andExpect(status().isNoContent());

        verify(groupService, times(1)).deleteGroup(1L);
    }

    @Test
    void addUserToGroup() throws Exception {
        UserGroupDto userGroupDto = new UserGroupDto(1L, 1L);

        mockMvc.perform(post("/api/v1/groups/add-user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(userGroupDto)))
                .andExpect(status().isOk());

        verify(groupService, times(1)).addUserToGroup(1L, 1L);
    }

    @Test
    void removeUserFromGroup() throws Exception {
        UserGroupDto userGroupDto = new UserGroupDto(1L, 1L);

        mockMvc.perform(delete("/api/v1/groups/remove-user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(userGroupDto)))
                .andExpect(status().isOk());

        verify(groupService, times(1)).removeUserFromGroup(1L, 1L);
    }

    @Test
    void getGroupByName() throws Exception {
        when(groupService.getGroupByName("Test Group")).thenReturn(group);

        mockMvc.perform(get("/api/v1/groups/name/{name}", "Test Group"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Test Group"));

        verify(groupService, times(1)).getGroupByName("Test Group");
    }

    @Test
    void searchGroupsByName() throws Exception {
        List<Group> groups = List.of(group, new Group(), new Group(), new Group());
        when(groupService.searchGroupsByName("Test")).thenReturn(groups);

        mockMvc.perform(get("/api/v1/groups/search/{name}", "Test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].name").value("Test Group"));

        verify(groupService, times(1)).searchGroupsByName("Test");
    }

    @Test
    void searchGroupsByName_NotFound() throws Exception {
        when(groupService.searchGroupsByName("NonExistentGroup")).thenReturn(List.of());

        mockMvc.perform(get("/api/v1/groups/search/{name}", "NonExistentGroup"))
                .andExpect(status().isNotFound());

        verify(groupService, times(1)).searchGroupsByName("NonExistentGroup");
    }
}
