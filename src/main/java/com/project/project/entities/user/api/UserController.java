package com.project.project.entities.user.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.dto.BaseResponseDto;
import com.project.project.entities.user.User;
import com.project.project.entities.user.api.dto.RequestPatchUserDto;
import com.project.project.entities.user.api.dto.ResponseUserDto;
import com.project.project.entities.user.api.dto.UserMapper;
import com.project.project.entities.user.api.dto.View;
import com.project.project.entities.user.model.AddUserModel;
import com.project.project.entities.user.service.UserServiceImpl;
import com.project.project.entities.user.status.UserStatus;
import com.project.project.exceptions.UserNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001",
}, allowedHeaders = "*")
@RequiredArgsConstructor
public class UserController {
    private final UserServiceImpl userService;

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

    @GetMapping("/create")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseUserDto> addUser(@Valid @RequestBody AddUserModel addUserModel) {
        User user = new User();
        user.setFirstName(addUserModel.firstName());
        user.setLastName(addUserModel.lastName());
        user.setEmail(addUserModel.email());
        user.setPassword(addUserModel.password());
        user.setGender(addUserModel.gender());
        user.setDateOfBirth(addUserModel.dateOfBirth());
        user.setAvatar(addUserModel.avatar());
        user.setPhones(addUserModel.phones());
        user.setPhotoData(addUserModel.photoData());

        User savedUser = userService.addUser(user);

        ResponseUserDto responseUserDto = new ResponseUserDto();
        responseUserDto.setId(savedUser.getId());
        responseUserDto.setFirstName(savedUser.getFirstName());
        responseUserDto.setLastName(savedUser.getLastName());
        responseUserDto.setEmail(savedUser.getEmail());

        return ResponseEntity.ok(responseUserDto);
    }

    @PatchMapping("/patch/{id}")
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
}