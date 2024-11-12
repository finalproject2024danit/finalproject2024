package com.project.project.security.SysUser.api;

import com.project.project.security.SysUser.api.dto.JwtRefreshTokenDto;
import com.project.project.security.SysUser.api.dto.JwtRequest;
import com.project.project.security.SysUser.api.dto.JwtResponse;
import com.project.project.security.SysUser.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
