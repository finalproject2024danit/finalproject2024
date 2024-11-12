package com.project.project.security;

import com.project.project.security.filter.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class MySecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .httpBasic(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(requests ->
                        requests
                                .requestMatchers("/**").permitAll()
                                .requestMatchers("/").permitAll()
//                                .requestMatchers("/css/**").permitAll()
//                                .requestMatchers("/js/**").permitAll()
//                                .requestMatchers("/images/**").permitAll()
//                                .requestMatchers("/h2-console/**").permitAll()
//                                .requestMatchers("/auth/**").permitAll()
//                                .requestMatchers("/ws/**").permitAll()
//                                .requestMatchers("/dashboard").authenticated()
//                                .requestMatchers("/api/v1/**").authenticated()
//                                .requestMatchers("/registration").hasAuthority("ADMIN")
//                                .requestMatchers("/create").hasAuthority("ADMIN")
                )
//                 only for mvc
//                .formLogin(AbstractAuthenticationFilterConfigurer::permitAll)

                .addFilterAfter(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
