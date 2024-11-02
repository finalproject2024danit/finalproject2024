package com.project.project.dto.globalSearch.service;

import com.project.project.entities.group.Group;
import com.project.project.entities.user.User;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

@Repository
public interface GlobalSearchService {

    Specification<User> userContains(String keyword);

    Specification<Group> groupContains(String keyword);

}