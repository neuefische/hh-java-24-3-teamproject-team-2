package com.github.esgoet.backend.services;

import com.github.esgoet.backend.models.Book;
import com.github.esgoet.backend.models.BookNotFoundException;
import com.github.esgoet.backend.repositories.BookRepository;
import org.junit.jupiter.api.Test;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class BookServiceUnitTest {

    private final BookRepository bookRepo = mock(BookRepository.class);
    private final BookService bookService = new BookService(bookRepo);

    @Test
    void getAllBooks_Test() {
        List<Book> allBooks = List.of(
                new Book("1", "Simon", "Java for Dummies"),
                new Book("2","Florian", "Java not for Dummies")
        );

        List<Book> expectedBooks = List.of(
                new Book("1", "Simon", "Java for Dummies"),
                new Book("2","Florian", "Java not for Dummies")
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
    void getBook_Test_whenBookExists_thenReturnBook() {
        //GIVEN
        Book book = new Book("1", "George Orwell", "1984");
        when(bookRepo.findById("1")).thenReturn(Optional.of(book));
        //WHEN
        Book actual = bookService.getBook("1");
        //THEN
        Book expected = new Book("1", "George Orwell", "1984");
        verify(bookRepo).findById("1");
        assertEquals(expected, actual);
    }

    @Test
    void getBook_Test_whenBookDoesNotExists_thenThrow() {
        //GIVEN
        when(bookRepo.findById("1")).thenReturn(Optional.empty());
        //WHEN
        //THEN
        assertThrows(BookNotFoundException.class,() -> bookService.getBook("1"));
        verify(bookRepo).findById("1");
    }



    @Test
    void deleteBook_Test() {
        doNothing().when(bookRepo).deleteById("1");
        bookService.deleteBook("1");
        verify(bookRepo).deleteById("1");
    }
}