package com.github.esgoet.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Test
    @DirtiesContext
    void getLoggedInUserTest() throws Exception {
        mockMvc.perform(get("/api/auth/me")
                .with(oidcLogin().idToken(token -> token.subject("123"))
                        .userInfoToken(token -> token.claim("login", "esgoet"))))
                .andExpect(status().isOk())
                .andExpect(content().string("esgoet"));
    }
}
