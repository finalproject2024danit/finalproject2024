package com.project.project.entities.user.service;

import com.project.project.entities.user.User;
import com.project.project.entities.user.api.dto.RequestPatchUserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserService {
    Page<User> findAllFiltered(Pageable pageable);

    User getUserById(long id);

    User addUser(User user);

    User patchUser(Long id, RequestPatchUserDto requestPatchUserDto) throws IllegalAccessException;

    List<User> searchByFirstName(String firstName);

    List<User> searchByFirstNameAndLastName(String firstName, String lastName);

    List<User> findAllById(Iterable<Long> userIds);

    List<User> getFriendsByUserId(Long userId);
}
