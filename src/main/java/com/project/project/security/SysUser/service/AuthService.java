package com.project.project.security.SysUser.service;


import com.project.project.security.SysUser.SysUser;
import com.project.project.security.SysUser.api.dto.JwtRequest;
import com.project.project.security.SysUser.api.dto.JwtResponse;
import com.project.project.security.jwt.JwtProvider;
import com.project.project.security.refreshToken.RefreshToken;
import com.project.project.security.refreshToken.db.RefreshTokenRepository;
import io.jsonwebtoken.Claims;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final MemberService memberService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public JwtResponse login(JwtRequest jwtRequest) {
        SysUser sysUser = memberService.getUserByLogin(jwtRequest.getLogin()).orElse(null);

        if (sysUser == null) {
            return null;
        }

        boolean passwordMatches = passwordEncoder.matches(jwtRequest.getPassword(), sysUser.getEncryptedPassword());
        if (!passwordMatches) {
            return null;
        }

        String accessToken = jwtProvider.generateAccessToken(sysUser);
        String refreshToken = jwtProvider.generateRefreshToken(sysUser);

        RefreshToken refreshTokenToBD = new RefreshToken(refreshToken, true, sysUser);
        refreshTokenRepository.save(refreshTokenToBD);

        return new JwtResponse(accessToken, refreshToken);
    }

    public JwtResponse refreshToken(@NonNull String refreshToken) {
        if (jwtProvider.validateRefreshToken(refreshToken)) {
            final Claims claims = jwtProvider.getRefreshClaims(refreshToken);
            final String login = claims.getSubject();

            RefreshToken saveRefreshToken = refreshTokenRepository
                    .findRefreshTokenByRefreshToken(refreshToken).orElse(null);

            if (saveRefreshToken != null && saveRefreshToken.getRefreshToken().equals(refreshToken) && saveRefreshToken.getIsValid()) {
                final SysUser sysUser = memberService.getUserByLogin(login)
                        .orElse(null);
                if (sysUser == null) {
                    return null;
                }

                final String accessToken = jwtProvider.generateAccessToken(sysUser);
                final String newRefreshToken = jwtProvider.generateRefreshToken(sysUser);

                saveRefreshToken.setIsValid(false);
                refreshTokenRepository.save(saveRefreshToken);

                RefreshToken refreshTokenToBD = new RefreshToken(newRefreshToken, true, sysUser);
                refreshTokenRepository.save(refreshTokenToBD);

                return new JwtResponse(accessToken, newRefreshToken);
            }
        }
        return null;
    }
}