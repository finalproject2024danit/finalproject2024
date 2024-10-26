package com.project.project.entities.group.service;

import com.project.project.entities.group.Group;
import com.project.project.entities.group.db.GroupRepository;
import com.project.project.entities.group.status.GroupStatus;
import com.project.project.entities.user.User;
import com.project.project.entities.user.db.UserRepository;
import com.project.project.entities.user.status.UserStatus;
import com.project.project.exceptions.GroupNotFoundException;
import com.project.project.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    @Override
    public Group getGroupById(Long groupId) {
        return groupRepository.findById(groupId)
                .orElseThrow(() -> new GroupNotFoundException(GroupStatus.GROUP_NOT_FOUND.getMessage()));
    }

    @Override
    public Group createGroup(Group group) {
        return groupRepository.save(group);
    }

    @Override
    public void deleteGroup(Long groupId) {
        groupRepository.findById(groupId)
                .orElseThrow(() -> new GroupNotFoundException(GroupStatus.GROUP_NOT_FOUND.getMessage()));
        groupRepository.deleteById(groupId);
    }


    @Override
    public void addUserToGroup(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new GroupNotFoundException(GroupStatus.GROUP_NOT_FOUND.getMessage()));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(UserStatus.USER_NOT_FOUND.getMessage()));

        if (!group.getUsers().contains(user)) {
            group.getUsers().add(user);
            groupRepository.save(group);
        } else {
            throw new IllegalArgumentException(GroupStatus.IS_ALREADY_A_MEMBER.getMessage());
        }
    }

    @Override
    public void removeUserFromGroup(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new GroupNotFoundException(GroupStatus.GROUP_NOT_FOUND.getMessage()));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(UserStatus.USER_NOT_FOUND.getMessage()));

        if (group.getUsers().contains(user)) {
            group.getUsers().remove(user);
            groupRepository.save(group);
        } else {
            throw new IllegalArgumentException(GroupStatus.NOT_MEMBER.getMessage());
        }
    }

    @Override
    public Group getGroupByName(String name) {
        return groupRepository.findByName(name)
                .orElseThrow(() -> new GroupNotFoundException(GroupStatus.GROUP_NOT_FOUND.getMessage()));
    }

    @Override
    public List<Group> searchGroupsByName(String name) {
        List<Group> groups = groupRepository.findByNameContaining(name);

        if (groups.isEmpty() || groups.size() < 3) {
            throw new GroupNotFoundException(GroupStatus.GROUP_NOT_FOUND.getMessage());
        }

        return groups;
    }


}
