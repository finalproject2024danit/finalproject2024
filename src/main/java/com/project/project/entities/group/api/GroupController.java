package com.project.project.entities.group.api;


import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.entities.group.Group;
import com.project.project.entities.group.api.dto.*;
import com.project.project.entities.group.service.GroupServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/filter")
    @JsonView(View.Admin.class)
    public ResponseEntity<List<ResponseGroupDto>> findAllFiltered(@RequestParam(defaultValue = "0") int startPage,
                                                                  @RequestParam(defaultValue = "10") int perPage,
                                                                  @RequestParam(defaultValue = "id") String sortBy,
                                                                  @RequestParam(defaultValue = "asc") String sortDirection) {
        log.info("Trying to get all groups with parameters");
        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Pageable pageable = PageRequest.of(startPage, perPage, Sort.by(direction, sortBy));

        List<ResponseGroupDto> groups = groupService.findAllFiltered(pageable).stream()
                .map(GroupMapper.INSTANCE::groupToResponseGroupDTO).toList();
        if (groups.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(groups);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseGroupFullInfoDto> getGroupById(@PathVariable("id") Long groupId) {
        log.info("Trying to get group by id");

        Group group = groupService.getGroupById(groupId);

        ResponseGroupFullInfoDto responseGroupFullInfoDto = GroupMapper.INSTANCE.groupToResponseGroupFullInfoDTO(group);

        return ResponseEntity.ok(responseGroupFullInfoDto);
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

    @GetMapping("/name/{name}")
    public ResponseEntity<ResponseGroupDto> getGroupByName(@PathVariable String name) {
        log.info("Trying to get group by name");

        Group group = groupService.getGroupByName(name);

        ResponseGroupDto responseGroupDto = GroupMapper.INSTANCE.groupToResponseGroupDTO(group);

        return ResponseEntity.ok(responseGroupDto);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<ResponseGroupDto>> searchGroupsByName(@PathVariable String name) {
        List<Group> groups = groupService.searchGroupsByName(name);

        if (groups.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<ResponseGroupDto> responseGroupsDto = groups.stream()
                .map(GroupMapper.INSTANCE::groupToResponseGroupDTO)
                .toList();

        return ResponseEntity.ok(responseGroupsDto);
    }
}