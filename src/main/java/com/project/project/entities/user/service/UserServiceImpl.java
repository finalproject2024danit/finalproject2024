package com.project.project.entities.user.service;

import com.project.project.entities.user.User;
import com.project.project.entities.user.api.dto.RequestPatchUserDto;
import com.project.project.entities.user.db.UserRepository;
import com.project.project.entities.user.status.UserStatus;
import com.project.project.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

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

    @Override
    public List<User> searchByFirstName(String firstName) {
        return userRepository.searchByFirstName(firstName);
    }

    @Override
    public List<User> searchByFirstNameAndLastName(String firstName, String lastName) {
        return userRepository.searchByFirstNameAndLastName(firstName, lastName);
    }

    @Override
    public List<User> findAllById(Iterable<Long> userIds) {
        return userRepository.findAllById(userIds);
    }

    @Override
    public List<User> getFriendsByUserId(Long userId) {
        return userRepository.findFriendsByUserId(userId);
    }

    @Override
    public UserDetails getUserByEmail(String email) throws UsernameNotFoundException {

        Optional<User> user = userRepository.findByUserEmail(email);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException(email);
        }
        List<SimpleGrantedAuthority> authorities = user.get().getSysRoles().stream()
                .map(r -> new SimpleGrantedAuthority(r.getRoleName()))
                .toList();
        return new org.springframework.security.core.userdetails.User(user.get().getEmail(), user.get().getPassword(), authorities);
    }

}
