package com.project.project.entities.user.service;

import com.project.project.entities.hobby.Hobby;
import com.project.project.entities.hobby.service.HobbyServiceImpl;
import com.project.project.entities.residence.Residence;
import com.project.project.entities.residence.service.ResidenceServiceImpl;
import com.project.project.entities.user.User;
import com.project.project.entities.user.api.dto.patch.RequestPatchUserDto;
import com.project.project.entities.user.db.UserRepository;
import com.project.project.entities.user.status.UserStatus;
import com.project.project.entities.workplace.Workplace;
import com.project.project.entities.workplace.service.WorkplaceServiceImpl;
import com.project.project.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ResidenceServiceImpl residenceService;
    private final HobbyServiceImpl hobbyService;
    private final WorkplaceServiceImpl workplaceService;

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

        Field[] dtoFields = requestPatchUserDto.getClass().getDeclaredFields();
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
    public User getUserByEmail(String email) throws UsernameNotFoundException {
        return userRepository.findByUserEmail(email).orElseThrow(() -> new UsernameNotFoundException(email));
    }

    @Override
    public User updateUserResidence(Long userId, Long residenceId) {
        User user = getUserById(userId);
        Residence residence = residenceService.getResidenceById(residenceId);

        user.setResidence(residence);
        return userRepository.save(user);
    }

    @Override
    public User updateUserHobbies(Long userId, Long hobbiesId) {
        User user = getUserById(userId);
        Hobby hobby = hobbyService.getHobbyById(hobbiesId);

        user.setHobby(hobby);
        return userRepository.save(user);
    }

    @Override
    public User updateUserWorkplace(Long userId, Long workplaceId) {
        User user = getUserById(userId);
        Workplace workplace = workplaceService.getWorkplaceById(workplaceId);

        user.setWorkplace(workplace);
        return userRepository.save(user);
    }
}
