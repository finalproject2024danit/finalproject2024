package com.project.project.user.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.user.User;
import com.project.project.user.api.dto.ResponseUserDto;
import com.project.project.user.api.dto.UserMapper;
import com.project.project.user.api.dto.View;
import com.project.project.user.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
}
