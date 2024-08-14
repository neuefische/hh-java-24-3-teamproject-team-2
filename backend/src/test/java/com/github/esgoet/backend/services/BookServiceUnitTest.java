package com.github.esgoet.backend.services;

import com.github.esgoet.backend.dto.NewBookDto;
import com.github.esgoet.backend.models.Book;
import com.github.esgoet.backend.models.Genre;
import com.github.esgoet.backend.repositories.BookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class BookServiceUnitTest {

    private final BookRepository bookRepo = mock(BookRepository.class);
    private final IdService idService = mock(IdService.class);
    private final BookService bookService = new BookService(bookRepo, idService);
    private final LocalDate localDate = LocalDate.parse("2024-08-14");

    @Test
    void getAllBooks_Test() {
        List<Book> allBooks = List.of(
                new Book("1", "Simon", "Java for Dummies", Genre.SCIENCE, localDate),
                new Book("2","Florian", "Java not for Dummies", Genre.SCIENCE, localDate)
        );

        List<Book> expectedBooks = List.of(
                new Book("1", "Simon", "Java for Dummies", Genre.SCIENCE, localDate),
                new Book("2","Florian", "Java not for Dummies", Genre.SCIENCE, localDate)
        );

        when(bookRepo.findAll()).thenReturn(allBooks);
        List<Book> actualBooks = bookService.getAllBooks();

        verify(bookRepo).findAll();
        assertEquals(expectedBooks, actualBooks);
    }

    @Test
    void getAllBooks_WhenEmpty_ReturnsEmptyList() {
        List<Book> expectedBooks = new ArrayList<Book>();
        List<Book> actualBooks = bookService.getAllBooks();

        assertEquals(expectedBooks, actualBooks);
    }

    @Test
    void addABookTest_whenNewBookAsInput_thenReturnNewBook() {
        // GIVEN
        NewBookDto newBookDto = new NewBookDto("J. K. Rowling", "Harry Potter", Genre.FANTASY, localDate);
        Book bookToSave = new Book(idService.randomId(), newBookDto.author(), newBookDto.title(), newBookDto.genre(), newBookDto.publicationDate());
        when(bookRepo.save(bookToSave)).thenReturn(bookToSave);

        // WHEN
        Book actual = bookService.saveNewABook(newBookDto);

        // THEN
        Book expected = bookToSave;
        verify(bookRepo).save(bookToSave);
        assertEquals(expected, actual);
    }
}