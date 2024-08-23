package com.github.esgoet.backend.security;

import com.github.esgoet.backend.user.models.User;
import com.github.esgoet.backend.user.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @GetMapping("/me")
    public User getUser(@AuthenticationPrincipal OAuth2User user) {
        return userService.getUserByGitHubId(user.getName());
    }
}
