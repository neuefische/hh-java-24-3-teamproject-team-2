package com.github.esgoet.backend.security;

import com.github.esgoet.backend.user.models.User;
import com.github.esgoet.backend.user.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    UserRepository userRepository;

    @Test
    @DirtiesContext
    void getLoggedInUserTest() throws Exception {
        userRepository.save(new User("1","esgoet", 0, LocalDate.now(), 0,  "123", "USER"));

        mockMvc.perform(get("/api/auth/me")
                .with(oidcLogin().idToken(token -> token.subject("123"))
                        .userInfoToken(token -> token.claim("login", "esgoet"))))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                      "userName": "esgoet",
                      "readingGoal": 0,
                      "readBooks": 0,
                      "gitHubId": "123",
                      "role": "USER"
                    }
                    """))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.goalDate").exists());
    }
}
