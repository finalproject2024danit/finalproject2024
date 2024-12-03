package com.project.project.entities.user.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.dto.BaseResponseDto;
import com.project.project.entities.user.User;
import com.project.project.entities.user.api.dto.*;
import com.project.project.entities.user.model.AddUserModel;
import com.project.project.entities.user.service.UserServiceImpl;
import com.project.project.entities.user.status.UserStatus;
import com.project.project.exceptions.UserNotFoundException;
import com.project.project.security.SysUser.api.dto.JwtResponse;
import com.project.project.security.SysUser.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001"
}, allowedHeaders = "*")
public class UserController {
    private final UserServiceImpl userService;
    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/filter")
    @JsonView(View.Admin.class)
    public ResponseEntity<List<ResponseUserDto>> findAllFiltered(@RequestParam(defaultValue = "0") int startPage,
                                                                 @RequestParam(defaultValue = "10") int perPage,
                                                                 @RequestParam(defaultValue = "id") String sortBy,
                                                                 @RequestParam(defaultValue = "asc") String sortDirection) {
        log.info("Trying to get all users with parameters");
        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Pageable pageable = PageRequest.of(startPage, perPage, Sort.by(direction, sortBy));

        List<ResponseUserDto> users = userService.findAllFiltered(pageable).stream()
                .map(UserMapper.INSTANCE::userToUserDto).toList();
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(users);
        }
    }

    @GetMapping("/user/{id}")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseUserDto> getCustomerById(@PathVariable long id) {
        log.info("Trying to get user by id: {}", id);

        User user = userService.getUserById(id);

        ResponseUserDto responseDto = UserMapper.INSTANCE.userToUserDto(user);

        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/create")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseUserWithTokenDto> addUser(@Valid @RequestBody AddUserModel addUserModel) {
        log.info("Trying to create new user");

        User user = UserMapper.INSTANCE.registrationDtoTOUser(addUserModel);
        user.setEnabled(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userService.addUser(user);

        JwtResponse jwtResponse = authService.generateTokensForUser(savedUser);

        ResponseUserWithTokenDto responseUserWithTokenDto = UserMapper.INSTANCE.userToUserWithTokenDto(savedUser);
        responseUserWithTokenDto.setType(jwtResponse.getType());
        responseUserWithTokenDto.setAccessToken(jwtResponse.getAccessToken());
        responseUserWithTokenDto.setRefreshToken(jwtResponse.getRefreshToken());

        return ResponseEntity.ok(responseUserWithTokenDto);
    }

    @PatchMapping("/patch/{id}")
    @JsonView(View.Admin.class)
    public ResponseEntity<BaseResponseDto<ResponseUserDto>> patchUser(
            @PathVariable Long id,
            @Valid @RequestBody RequestPatchUserDto requestPatchUserDto) {
        log.info("Trying to patch customer with ID: {}", id);

        BaseResponseDto<ResponseUserDto> baseResponseDto = new BaseResponseDto<>();

        try {
            User updatedUser = userService.patchUser(id, requestPatchUserDto);
            ResponseUserDto responseCustomerDto = UserMapper.INSTANCE.userToUserDto(updatedUser);

            baseResponseDto.setDto(responseCustomerDto);
            baseResponseDto.setMessage(UserStatus.USER_UPDATED.getMessage());

            return ResponseEntity.ok(baseResponseDto);

        } catch (UserNotFoundException e) {
            baseResponseDto.setMessage(UserStatus.USER_NOT_FOUND.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(baseResponseDto);

        } catch (Exception e) {
            baseResponseDto.setMessage(UserStatus.UNEXPECTED.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(baseResponseDto);
        }
    }

    @GetMapping("/search")
    @JsonView(View.Admin.class)
    public List<ResponseUserDto> searchByFullName(@RequestParam String fullName) {
        log.info("Trying to search users by name and surname");
        String[] nameParts = fullName.trim().split("\\s+");
        String firstName = nameParts[0];

        String lastName = nameParts.length > 1 ? nameParts[1] : "";

        if (lastName.isEmpty()) {
            List<User> users = userService.searchByFirstName(firstName);
            return users.stream()
                    .map(UserMapper.INSTANCE::userToUserDto)
                    .toList();
        }
        List<User> users = userService.searchByFirstNameAndLastName(firstName, lastName);
        return users.stream()
                .map(UserMapper.INSTANCE::userToUserDto)
                .toList();
    }

    @GetMapping("/user_all_info/{id}")
//    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseUserAllDataDto> getAllUserInformationById(@PathVariable long id) {
        log.info("Trying to get all information about user id: {}", id);

        User user = userService.getUserById(id);

        ResponseUserAllDataDto responseUserAllDataDto = UserMapper.INSTANCE.userToUserAllDataDto(user);

        return ResponseEntity.ok(responseUserAllDataDto);
    }

    @GetMapping("/{userId}/friends")
    @JsonView(View.Admin.class)
    public List<ResponseUserDto> getFriendsByUserId(@PathVariable Long userId) {
        log.info("Trying to get all friends by user id: {}", userId);

        List<User> friendsByUserId = userService.getFriendsByUserId(userId);

        return friendsByUserId.stream()
                .map(UserMapper.INSTANCE::userToUserDto)
                .toList();
    }

}