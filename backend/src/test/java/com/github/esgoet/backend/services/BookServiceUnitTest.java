package com.github.esgoet.backend.services;

import com.github.esgoet.backend.models.Book;
import com.github.esgoet.backend.models.BookNotFoundException;
import com.github.esgoet.backend.repositories.BookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

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
                new Book("1", "Simon", "Java for Dummies", "horror", "this is a description", "123456isbn", "https://linkToCover"),
                new Book("2", "Florian", "Java not for Dummies", "action", "this is a description2", "789012isbn", "https://linkToAnotherCover")
        );

        List<Book> expectedBooks = List.of(
                new Book("1", "Simon", "Java for Dummies", "horror", "this is a description", "123456isbn", "https://linkToCover"),
                new Book("2", "Florian", "Java not for Dummies", "action", "this is a description2", "789012isbn", "https://linkToAnotherCover")
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
        Book book = new Book("1", "George Orwell", "1984", "Thriller", "this is a description", "123456isbn", "https://linkToCover");
        when(bookRepo.findById("1")).thenReturn(Optional.of(book));
        //WHEN
        Book actual = bookService.getBook("1");
        //THEN
        Book expected = new Book("1", "George Orwell", "1984", "Thriller", "this is a description", "123456isbn", "https://linkToCover");
        verify(bookRepo).findById("1");
        assertEquals(expected, actual);
    }

    @Test
    void getBook_Test_whenBookDoesNotExists_thenThrow() {
        //GIVEN
        when(bookRepo.findById("1")).thenReturn(Optional.empty());
        //WHEN
        //THEN
        assertThrows(BookNotFoundException.class, () -> bookService.getBook("1"));
        verify(bookRepo).findById("1");
    }

    @Test
    void testUpdateBook_Success() {

        // Given
        String id = "1";
        Book existingBook = new Book(id, "author1", "title1", "genre1", "description1", "12345678", "cover1");
        Book updatedBook = new Book(id, "author2", "title2", "genre2", "description2", "23456789", "cover2");

        // When
        when(bookRepo.findById(id)).thenReturn(Optional.of(existingBook));
        when(bookRepo.save(any(Book.class))).thenAnswer(invocation -> invocation.getArguments()[0]);

        Book result = bookService.updateBook(updatedBook, id);

        // Then
        assertNotNull(result);
        assertEquals(updatedBook.title(), result.title());
        assertEquals(updatedBook.author(), result.author());
        assertEquals(updatedBook.genre(), result.genre());
        assertEquals(updatedBook.description(), result.description());
        assertEquals(updatedBook.cover(), result.cover());
        assertEquals(updatedBook.isbn(), result.isbn());
        verify(bookRepo).findById(id);
        verify(bookRepo).save(any(Book.class));
    }

    @Test
    void testUpdateBook_BookNotFound() {

        // Given
        String id = "1";
        Book updatedBook = new Book(id, "author", "title", "genre", "description", "isbn", "cover");

        //When
        when(bookRepo.findById(id)).thenReturn(Optional.empty());

        //Then
        BookNotFoundException thrown = assertThrows(
                BookNotFoundException.class,
                () -> bookService.updateBook(updatedBook, id)
        );
        assertEquals("No book found with id: " + id, thrown.getMessage());
        verify(bookRepo).findById(id);
        verify(bookRepo, never()).save(any(Book.class));
    }

}