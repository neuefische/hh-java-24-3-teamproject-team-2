package com.github.esgoet.backend.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class BookControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void getAllBooks_Test_When_DbEmpty_Then_returnEmptyArray() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

    }

    @Test
    @DirtiesContext
    public void addABookTest_whenNewTodoExists_thenReturnNewTodo() throws Exception {
        // GIVEN

        // WHEN
        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                     {
                         "author": "Tolstoy",
                         "title": "War and Peace",
                         "genre": "HISTORY",
                         "publicationDate": "1869-01-01"
                     }
                """))
                // THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.author").value("Tolstoy"))
                .andExpect(jsonPath("$.title").value("War and Peace"))
                .andExpect(jsonPath("$.genre").value("HISTORY"))
                .andExpect(jsonPath("$.publicationDate").value("1869-01-01"));

    }

}