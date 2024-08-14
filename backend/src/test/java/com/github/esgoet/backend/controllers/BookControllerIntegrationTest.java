package com.github.esgoet.backend.controllers;

import com.github.esgoet.backend.models.Book;
import com.github.esgoet.backend.models.Genre;
import com.github.esgoet.backend.repositories.BookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class BookControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    BookRepository bookRepository;

    private final LocalDate localDate = LocalDate.parse("2024-08-14");

    @Test
    public void getAllBooks_Test_When_DbEmpty_Then_returnEmptyArray() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

    }

    @DirtiesContext
    @Test
    void getBook_Test_whenIdExists() throws Exception {
        //GIVEN
        bookRepository.save(new Book("1","George Orwell", "1984", Genre.FANTASY, localDate));
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/1"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                          "id": "1",
                          "author": "George Orwell",
                          "title": "1984"
                        }
                        """));
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

}