package com.project.project.entities.group.service;

import com.project.project.entities.group.Group;
import com.project.project.entities.group.api.dto.ResponseGroupFullInfoDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GroupService {

    Page<Group> findAllFiltered(Pageable pageable);

    Group getGroupById(Long groupId);

    ResponseGroupFullInfoDto getGroupFullInfo(Long groupId);

    Group createGroup(Group group);

    void deleteGroup(Long groupId);

    void addUserToGroup(Long groupId, Long userId);

    void removeUserFromGroup(Long groupId, Long userId);

    Group getGroupByName(String name);

    List<Group> searchGroupsByName(String name);
}
