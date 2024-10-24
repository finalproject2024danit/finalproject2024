package com.project.project.entities.user.service;

import com.project.project.entities.user.api.dto.RequestPatchUserDto;
import com.project.project.entities.user.db.UserRepository;
import com.project.project.exceptions.UserNotFoundException;
import com.project.project.entities.user.User;
import com.project.project.entities.user.status.UserStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;

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

    @Override
    public User patchUser(Long id, RequestPatchUserDto requestPatchUserDto) throws IllegalAccessException {
        User user = getUserById(id);

        Field[] dtoFields = RequestPatchUserDto.class.getDeclaredFields();
        Field[] entityFields = User.class.getDeclaredFields();

        for (Field dtoField : dtoFields) {
            dtoField.setAccessible(true);
            Object value = dtoField.get(requestPatchUserDto);
            if (value != null) {
                String fieldName = dtoField.getName();

                for (Field entityField : entityFields) {
                    if (entityField.getName().equals(fieldName) && entityField.getType().equals(dtoField.getType())) {
                        entityField.setAccessible(true);
                        entityField.set(user, value);
                        entityField.setAccessible(false);
                        break;
                    }
                }
            }
            dtoField.setAccessible(false);
        }

        userRepository.save(user);
        return user;
    }
}
