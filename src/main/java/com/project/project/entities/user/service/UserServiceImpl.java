package com.project.project.entities.user.service;

import com.project.project.entities.user.User;
import com.project.project.entities.user.api.dto.RequestPatchUserDto;
import com.project.project.entities.user.api.dto.ResponseUserAllDataDto;
import com.project.project.entities.user.db.UserRepository;
import com.project.project.entities.user.status.UserStatus;
import com.project.project.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;

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
    public ResponseUserAllDataDto findAllInformationAboutUser(long userId) {
        ResponseUserAllDataDto user = userRepository.findAllInformationAboutUser(userId)
                .orElseThrow(() -> new UserNotFoundException(UserStatus.USER_NOT_FOUND.getMessage()));

        // Ручное сопоставление полей из User в ResponseUserAllDataDto
        ResponseUserAllDataDto responseDto = new ResponseUserAllDataDto();
        responseDto.setId(user.getId());
        responseDto.setFirstName(user.getFirstName());
        responseDto.setLastName(user.getLastName());
        responseDto.setEmail(user.getEmail());
        responseDto.setGender(user.getGender());
        responseDto.setDateOfBirth(user.getDateOfBirth());
        responseDto.setAvatar(user.getAvatar());
        responseDto.setPhones(user.getPhones());
        responseDto.setPhotoData(user.getPhotoData());
        responseDto.setCreatedDate(user.getCreatedDate());
        responseDto.setLastModifiedDate(user.getLastModifiedDate());

        // Если у вас есть связь с Residence и вы хотите добавить ее в DTO, вам нужно сделать это здесь
        // Например, если у вас есть метод getResidence у User:
//        if (user.getResidence() != null) {
//            responseDto.setResidencePlanet(user.getResidence().getPlanet());
//            responseDto.setResidenceCountry(user.getResidence().getCountry());
//            responseDto.setResidenceCity(user.getResidence().getCity());
//        }

        return responseDto;
    }

    public List<User> getFriendsByUserId(Long userId) {
        return userRepository.findFriendsByUserId(userId);
    }

}
