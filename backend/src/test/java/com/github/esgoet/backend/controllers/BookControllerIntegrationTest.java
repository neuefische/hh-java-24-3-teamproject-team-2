package com.github.esgoet.backend.controllers;

import com.github.esgoet.backend.models.Book;
import com.github.esgoet.backend.repositories.BookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class BookControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    BookRepository bookRepository;

    @Test
    public void getAllBooks_Test_When_DbEmpty_Then_returnEmptyArray() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));

    }

    @Test
    public void deleteBook() throws Exception {

        bookRepository.save(new Book("1", "Simon", "HowToDeleteBooksFast"));

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/books/1"))
                .andExpect(status().isOk());
    }

}