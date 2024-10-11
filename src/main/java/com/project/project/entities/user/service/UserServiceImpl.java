package com.project.project.entities.user.service;

import com.project.project.entities.user.db.UserRepository;
import com.project.project.exceptions.UserNotFoundException;
import com.project.project.entities.user.User;
import com.project.project.entities.user.status.UserStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public Page<User> findAllFiltered(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public User getUserById(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(UserStatus.USER_NOT_FOUND.getMessage()));
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }
}
