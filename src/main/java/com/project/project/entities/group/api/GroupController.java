package com.project.project.entities.group.api;

import com.project.project.entities.group.Group;
import com.project.project.entities.group.api.dto.GroupMapper;
import com.project.project.entities.group.api.dto.RequestGroupDto;
import com.project.project.entities.group.api.dto.ResponseGroupDto;
import com.project.project.entities.group.api.dto.UserGroupDto;
import com.project.project.entities.group.service.GroupServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/api/v1/groups")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001",
}, allowedHeaders = "*")
@RequiredArgsConstructor
public class GroupController {
    private final GroupServiceImpl groupService;

    @GetMapping("/{id}")
    public ResponseEntity<ResponseGroupDto> getGroupById(@PathVariable("id") Long groupId) {
        log.info("Trying to get group by id");

        Group group = groupService.getGroupById(groupId);

        ResponseGroupDto responseGroupDto = GroupMapper.INSTANCE.groupToResponseGroupDTO(group);

        return ResponseEntity.ok(responseGroupDto);
    }

    @PostMapping
    public ResponseEntity<ResponseGroupDto> createGroup(@RequestBody RequestGroupDto requestGroupDto) {
        log.info("Trying to create a new group: {}", requestGroupDto);

        Group group = GroupMapper.INSTANCE.requestGroupDtoToGroup(requestGroupDto);
        Group savedGroup = groupService.createGroup(group);

        ResponseGroupDto responseGroupDto = GroupMapper.INSTANCE.groupToResponseGroupDTO(savedGroup);

        return ResponseEntity.ok(responseGroupDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable("id") Long groupId) {
        log.info("Trying to delete group by id: {}", groupId);

        groupService.deleteGroup(groupId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/add-user")
    public ResponseEntity<Void> addUserToGroup(@RequestBody UserGroupDto userGroupDto) {
        log.info("Trying to add user {} to group {}", userGroupDto.userId(), userGroupDto.groupId());

        groupService.addUserToGroup(userGroupDto.groupId(), userGroupDto.userId());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove-user")
    public ResponseEntity<Void> removeUserFromGroup(@RequestBody UserGroupDto userGroupDto) {
        log.info("Trying to remove user {} from group {}", userGroupDto.userId(), userGroupDto.groupId());

        groupService.removeUserFromGroup(userGroupDto.groupId(), userGroupDto.userId());

        return ResponseEntity.ok().build();
    }
}