package com.project.project.entities.group.service;

import com.project.project.entities.group.Group;
import com.project.project.entities.group.api.dto.ResponseGroupFullInfoDto;
import com.project.project.entities.group.db.GroupRepository;
import com.project.project.entities.group.status.GroupStatus;
import com.project.project.entities.post.api.dto.PostMapper;
import com.project.project.entities.post.api.dto.ResponsePostWithLikeCommentsSumDto;
import com.project.project.entities.user.User;
import com.project.project.entities.user.db.UserRepository;
import com.project.project.entities.user.status.UserStatus;
import com.project.project.exceptions.GroupNotFoundException;
import com.project.project.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final PostMapper postMapper;

    @Override
    public Page<Group> findAllFiltered(Pageable pageable) {
        return groupRepository.findAll(pageable);
    }

    @Override
    public Group getGroupById(Long groupId) {
        return groupRepository.findById(groupId)
                .orElseThrow(() -> new GroupNotFoundException(GroupStatus.GROUP_NOT_FOUND.getMessage()));
    }

    @Override
    public ResponseGroupFullInfoDto getGroupFullInfo(Long groupId) {
        Group group = getGroupById(groupId);

        List<ResponsePostWithLikeCommentsSumDto> postsDto = group.getPosts().stream()
                .map(postMapper::postToPostWithLikesCommentsSumDto)
                .collect(Collectors.toList());


        return new ResponseGroupFullInfoDto(
                group.getId(),
                group.getName(),
                group.getIsOpen(),
                group.getPhoto(),
                postsDto,
                group.getCreatedDate(),
                group.getLastModifiedDate()
        );
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
