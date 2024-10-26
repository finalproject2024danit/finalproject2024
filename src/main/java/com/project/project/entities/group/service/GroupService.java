package com.project.project.entities.group.service;

import com.project.project.entities.group.Group;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupService {

    Group getGroupById(Long groupId);

    Group createGroup(Group group);

    void deleteGroup(Long groupId);

    void addUserToGroup(Long groupId, Long userId);

    void removeUserFromGroup(Long groupId, Long userId);

    Group getGroupByName(String name);

    List<Group> searchGroupsByName(String name);
}
