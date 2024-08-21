package com.github.esgoet.backend.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class AuthController {
    @GetMapping("/me")
    public String getUser(@AuthenticationPrincipal OAuth2User user) {
        return user.getAttributes().get("login").toString();
    }
}
