package com.project.project.entities.user.service;

import com.project.project.entities.user.User;
import com.project.project.entities.user.api.dto.patch.RequestPatchUserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    Page<User> findAllFiltered(Pageable pageable);

    User getUserById(long id);

    User addUser(User user);

    User patchUser(Long id, RequestPatchUserDto requestPatchUserDto) throws IllegalAccessException;

    List<User> searchByFirstName(String firstName);

    List<User> searchByFirstNameAndLastName(String firstName, String lastName);

    List<User> findAllById(Iterable<Long> userIds);

    Page<User> getFriendsByUserId(Long userId, Pageable pageable);

    User getUserByEmail(String email);

    User updateUserResidence(Long userId, Long residenceId);

    User updateUserHobbies(Long userId, Long hobbiesId);

    User updateUserWorkplace(Long userId, Long workplaceId);
}
