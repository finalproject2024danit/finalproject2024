package com.project.project.dto.globalSearch.service;

import com.project.project.dto.globalSearch.GlobalSearch;
import com.project.project.entities.group.Group;
import com.project.project.entities.group.db.GroupRepository;
import com.project.project.entities.user.User;
import com.project.project.entities.user.db.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GlobalSearchServiceImpl implements GlobalSearchService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public List<Object> search(GlobalSearch globalSearch) {
        String keyword = globalSearch.getKeyword();

        List<User> users = userRepository.findAll(userContains(keyword));
        List<Group> groups = groupRepository.findAll(groupContains(keyword));

        return List.of(users, groups);
    }

    @Override
    public Specification<User> userContains(String keyword) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.or(
                criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), "%" + keyword.toLowerCase() + "%"),
                criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), "%" + keyword.toLowerCase() + "%")
        );
    }

    @Override
    public Specification<Group> groupContains(String keyword) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.or(
                criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + keyword.toLowerCase() + "%"));
    }
}
