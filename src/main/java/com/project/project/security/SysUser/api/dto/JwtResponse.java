package com.project.project.security.SysUser.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

import static lombok.AccessLevel.PRIVATE;

@Getter
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class JwtResponse {

    final String type = "Bearer";

    String accessToken;

    String refreshToken;

}
