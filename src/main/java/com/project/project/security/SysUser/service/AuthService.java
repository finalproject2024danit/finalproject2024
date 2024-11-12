package com.project.project.security.SysUser.service;


import com.project.project.entities.user.User;
import com.project.project.entities.user.service.UserServiceImpl;
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

    private final UserServiceImpl userService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public JwtResponse login(JwtRequest jwtRequest) {
        User user = (User) userService.getUserByEmail(jwtRequest.getLogin());

        if (user == null) {
            return null;
        }

        boolean passwordMatches = passwordEncoder.matches(jwtRequest.getPassword(), user.getPassword());
        if (!passwordMatches) {
            return null;
        }

        String accessToken = jwtProvider.generateAccessToken(user);
        String refreshToken = jwtProvider.generateRefreshToken(user);

        RefreshToken refreshTokenToBD = new RefreshToken(refreshToken, true, user);
        refreshTokenRepository.save(refreshTokenToBD);

        return new JwtResponse(accessToken, refreshToken);
    }

    public JwtResponse refreshToken(@NonNull String refreshToken) {
        if (jwtProvider.validateRefreshToken(refreshToken)) {
            final Claims claims = jwtProvider.getRefreshClaims(refreshToken);
            final String email = claims.getSubject();

            RefreshToken saveRefreshToken = refreshTokenRepository
                    .findRefreshTokenByRefreshToken(refreshToken).orElse(null);

            if (saveRefreshToken != null && saveRefreshToken.getRefreshToken().equals(refreshToken) && saveRefreshToken.getIsValid()) {
                final User user = (User) userService.getUserByEmail(email);
                if (user == null) {
                    return null;
                }

                final String accessToken = jwtProvider.generateAccessToken(user);
                final String newRefreshToken = jwtProvider.generateRefreshToken(user);

                saveRefreshToken.setIsValid(false);
                refreshTokenRepository.save(saveRefreshToken);

                RefreshToken refreshTokenToBD = new RefreshToken(newRefreshToken, true, user);
                refreshTokenRepository.save(refreshTokenToBD);

                return new JwtResponse(accessToken, newRefreshToken);
            }
        }
        return null;
    }


    public JwtResponse generateTokensForUser(User user) {
        String accessToken = jwtProvider.generateAccessToken(user);
        String refreshToken = jwtProvider.generateRefreshToken(user);

        RefreshToken refreshTokenToBD = new RefreshToken(refreshToken, true, user);
        refreshTokenRepository.save(refreshTokenToBD);

        return new JwtResponse(accessToken, refreshToken);
    }

}