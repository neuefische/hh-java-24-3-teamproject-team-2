package com.github.esgoet.backend.security;

import com.github.esgoet.backend.user.dto.UserDto;
import com.github.esgoet.backend.user.models.User;
import com.github.esgoet.backend.user.models.UserNotFoundException;
import com.github.esgoet.backend.user.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

import java.time.LocalDate;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserService userService;

    @Value("${app.url}")
    private String appUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(a -> a
//                        .requestMatchers("/api/books").authenticated()
//                        .requestMatchers("/api/books/**").authenticated()
                        .anyRequest().permitAll()
                )
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .exceptionHandling(e -> e
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .oauth2Login(o -> o.defaultSuccessUrl(appUrl))
                .logout(l -> l.logoutSuccessUrl(appUrl));
        return http.build();
    }

    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService() {
        DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();

        return request -> {
            OAuth2User user = delegate.loadUser(request);
            User githubUser;
            try {
                githubUser = userService.getUserById(user.getName());
            } catch (UserNotFoundException e) {
                githubUser =  userService.saveUser(new UserDto(user.getAttributes().get("login").toString(),
                        0,
                        LocalDate.now(),
                        0,
                        user.getName(),
                        "USER"));
            }

            return new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(githubUser.role())), user.getAttributes(), "id");
        };
    }
}
