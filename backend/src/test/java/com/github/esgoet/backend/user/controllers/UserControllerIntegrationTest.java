package com.github.esgoet.backend.user.controllers;

import com.github.esgoet.backend.user.models.User;
import com.github.esgoet.backend.user.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerIntegrationTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    UserRepository userRepository;

    private final LocalDate goalDate = LocalDate.parse("2024-12-31");

    @Test
    void getUsersTest() throws Exception {
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @DirtiesContext
    @Test
    void getUserByIdTest_whenIdExists() throws Exception{
        //GIVEN
        userRepository.save(new User("1","esgoet", 6, goalDate, 0));
        //WHEN
        mockMvc.perform(get("/api/users/1"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                      "id": "1",
                      "userName": "esgoet",
                      "readingGoal": 6,
                      "goalDate": "2024-12-31",
                      "readBooks": 0
                    }
                    """));
    }

    @Test
    void getUserByIdTest_whenIdDoesNotExist() throws Exception {
        //WHEN
        mockMvc.perform(get("/api/users/1"))
                //THEN
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                    {
                      "message": "No user found with id: 1",
                      "statusCode": 404
                    }
                    """))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @DirtiesContext
    @Test
    void addUserTest() throws Exception {
        //WHEN
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "userName": "esgoet",
                      "readingGoal": 6,
                      "goalDate": "2024-12-31",
                      "readBooks": 0
                    }
                    """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                      "userName": "esgoet",
                      "readingGoal": 6,
                      "goalDate": "2024-12-31",
                      "readBooks": 0
                    }
                    """))
                .andExpect(jsonPath("$.id").exists());
    }

    @DirtiesContext
    @Test
    void updateUserTest() throws Exception {
        //GIVEN
        userRepository.save(new User("1","esgoet", 6, goalDate, 0));

        //WHEN
        mockMvc.perform(put("/api/users/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "userName": "esgoet",
                      "readingGoal": 6,
                      "goalDate": "2024-12-31",
                      "readBooks": 1
                    }
                    """))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                      "id": "1",
                      "userName": "esgoet",
                      "readingGoal": 6,
                      "goalDate": "2024-12-31",
                      "readBooks": 1
                    }
                    """));
    }

    @DirtiesContext
    @Test
    void deleteUserTest() throws Exception {
        //GIVEN
        userRepository.save(new User("1","esgoet", 6, goalDate, 0));

        //WHEN
        mockMvc.perform(delete("/api/users/1"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

    }
}