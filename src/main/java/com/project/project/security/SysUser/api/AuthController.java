package com.project.project.security.SysUser.api;

import com.project.project.entities.user.User;
import com.project.project.entities.user.api.dto.ResponseUserAllDataDto;
import com.project.project.entities.user.api.dto.UserMapper;
import com.project.project.security.SysUser.api.dto.JwtRefreshTokenDto;
import com.project.project.security.SysUser.api.dto.JwtRequest;
import com.project.project.security.SysUser.api.dto.JwtResponse;
import com.project.project.security.SysUser.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest authRequest) {
        return ResponseEntity.ok(authService.login(authRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtResponse> refresh(@RequestBody JwtRefreshTokenDto refreshTokenDto) {
        return ResponseEntity.ok(authService.refreshToken(refreshTokenDto.getRefreshToken()));
    }

    @PostMapping("/get_user")
    public ResponseEntity<ResponseUserAllDataDto> getUser(@RequestHeader("Authorization") String token) {
        String accessToken = token.startsWith("Bearer ") ? token.substring(7) : token;

        User user = authService.getUserByToken(accessToken);

        ResponseUserAllDataDto responseUserAllDataDto = UserMapper.INSTANCE.userToUserAllDataDto(user);
        return ResponseEntity.ok(responseUserAllDataDto);
    }
}
