package com.github.esgoet.backend.controllers;

import com.github.esgoet.backend.models.Book;
import com.github.esgoet.backend.repositories.BookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;


@SpringBootTest
@AutoConfigureMockMvc
class BookControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    BookRepository bookRepository;

    @Test
    public void getAllBooks_Test_When_DbEmpty_Then_returnEmptyArray() throws Exception {

        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

    }

    @DirtiesContext
    @Test
    void getBook_Test_whenIdExists() throws Exception {
        //GIVEN
        bookRepository.save(new Book("1", "George Orwell", "1984", "Thriller", "this is a description", "123456isbn", "https://linkToCover"));
        //WHEN
        mockMvc.perform(get("/api/books/1"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                             "id": "1",
                             "author": "George Orwell",
                             "title": "1984",
                             "genre": "Thriller",
                             "description": "this is a description",
                             "isbn": "123456isbn",
                             "cover": "https://linkToCover"
                        }
                        """));
    }

    @DirtiesContext
    @Test
    void getBook_Test_whenIdDoesNotExists() throws Exception {
        //WHEN
        mockMvc.perform(get("/api/books/1"))
                //THEN
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                        {
                          "message":"No book found with id: 1",
                          "statusCode":404
                        }
                        """))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    public void deleteBook() throws Exception {

        bookRepository.save(new Book("1", "Simon", "HowToDeleteBooksFast"));

        mockMvc.perform(delete("/api/books/1"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @DirtiesContext
    @Test
    void getBook_Test_whenIdDoesNotExists() throws Exception {
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/1"))
                //THEN
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                        {
                          "message":"No book found with id: 1",
                          "statusCode":404
                        }
                        """))
                .andExpect(jsonPath("$.timestamp").exists());
    }


    @DirtiesContext
    @Test
    void updateBook_Test_When_IdMatches() throws Exception {
        // GIVEN
        bookRepository.save(new Book("1", "author1", "title1", "genre1", "description1", "12345678", "cover1"));

        Book updatedBook = new Book("1", "author2", "title2", "genre2", "description2", "23456789", "cover2");

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/books/1/update")
                        .contentType("application/json")
                        .content("""
                                {
                                    "id": "1",
                                    "author": "author2",
                                    "title": "title2",
                                    "genre": "genre2",
                                    "description": "description2",
                                    "isbn": "23456789",
                                    "cover": "cover2"
                                }
                                """))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "1",
                            "author": "author2",
                            "title": "title2",
                            "genre": "genre2",
                            "description": "description2",
                            "isbn": "23456789",
                            "cover": "cover2"
                        }
                        """));
    }
}