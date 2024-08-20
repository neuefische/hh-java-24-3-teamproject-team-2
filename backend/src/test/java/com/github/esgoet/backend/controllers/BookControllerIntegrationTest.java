package com.github.esgoet.backend.controllers;

import com.github.esgoet.backend.models.Book;
import com.github.esgoet.backend.models.Genre;
import com.github.esgoet.backend.models.ReadingStatus;
import com.github.esgoet.backend.repositories.BookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;


@SpringBootTest
@AutoConfigureMockMvc
class BookControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    BookRepository bookRepository;

    private final LocalDate localDate = LocalDate.parse("2024-08-14");

    @Test
    void getAllBooks_Test_When_DbEmpty_Then_returnEmptyArray() throws Exception {

        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

    }

    @DirtiesContext
    @Test
    void getBook_Test_whenIdExists() throws Exception {
        //GIVEN
        bookRepository.save(new Book("1", "George Orwell", "1984", Genre.THRILLER, "this is a description", "123456isbn", "https://linkToCover", 3,localDate, ReadingStatus.TO_BE_READ));
        //WHEN
        mockMvc.perform(get("/api/books/1"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                             "id": "1",
                             "author": "George Orwell",
                             "title": "1984",
                             "genre": "THRILLER",
                             "description": "this is a description",
                             "isbn": "123456isbn",
                             "cover": "https://linkToCover",
                             "rating": 3,
                             "publicationDate": "2024-08-14",
                             "readingStatus": "TO_BE_READ"
                        }
                        """));
    }

    @Test
    @DirtiesContext
    void addABookTest_whenNewBookExists_thenReturnNewBook() throws Exception {
        // GIVEN

        // WHEN
        mockMvc.perform(post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                     {
                                         "author": "Tolstoy",
                                         "title": "War and Peace",
                                         "genre": "HISTORY",
                                         "description": "this is a description",
                                         "isbn": "123456isbn",
                                         "cover": "https://linkToCover",
                                         "rating": 3,
                                         "publicationDate": "1869-01-01",
                                         "readingStatus": "TO_BE_READ"
                                     }
                                """))
                // THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.author").value("Tolstoy"))
                .andExpect(jsonPath("$.title").value("War and Peace"))
                .andExpect(jsonPath("$.genre").value("HISTORY"))
                .andExpect(jsonPath("$.description").value("this is a description"))
                .andExpect(jsonPath("$.isbn").value("123456isbn"))
                .andExpect(jsonPath("$.cover").value("https://linkToCover"))
                .andExpect(jsonPath("$.rating").value(3))
                .andExpect(jsonPath("$.publicationDate").value("1869-01-01"))
                .andExpect(jsonPath("$.readingStatus").value("TO_BE_READ"));
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
    void deleteBook() throws Exception {

        bookRepository.save(new Book("1", "Simon", "HowToDeleteBooksFast", Genre.SCIENCE, "description", "12345678", "https://linkToCover", 3,localDate, ReadingStatus.TO_BE_READ));

        mockMvc.perform(delete("/api/books/1"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @DirtiesContext
    @Test
    void updateBook_Test_When_IdMatches() throws Exception {
        // GIVEN
        bookRepository.save(new Book("1", "author1", "title1", Genre.FANTASY, "description1", "12345678", "cover1", 3,localDate, ReadingStatus.TO_BE_READ));

        // WHEN
        mockMvc.perform(put("/api/books/1/update")
                        .contentType("application/json")
                        .content("""
                                {
                                   "author": "author2",
                                    "title": "title2",
                                    "genre": "HISTORY",
                                    "description": "description2",
                                    "isbn": "23456789",
                                    "cover": "cover2",
                                    "rating": 3,
                                    "publicationDate": "2024-08-14",
                                    "readingStatus": "READING"
                                }
                                """))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        { "id": "1",
                           "author": "author2",
                            "title": "title2",
                            "genre": "HISTORY",
                            "description": "description2",
                            "isbn": "23456789",
                            "cover": "cover2",
                            "rating": 3,
                            "publicationDate": "2024-08-14",
                            "readingStatus": "READING"
                        }
                        """));
    }
}