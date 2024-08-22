package com.github.esgoet.backend.book.services;

import com.github.esgoet.backend.book.dto.BookDto;
import com.github.esgoet.backend.book.models.Book;
import com.github.esgoet.backend.book.models.BookNotFoundException;
import com.github.esgoet.backend.book.models.Genre;
import com.github.esgoet.backend.book.models.ReadingStatus;
import com.github.esgoet.backend.book.repositories.BookRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class BookServiceUnitTest {

    private final BookRepository bookRepo = mock(BookRepository.class);
    private final IdService idService = mock(IdService.class);
    private final BookService bookService = new BookService(bookRepo, idService);
    private final LocalDate localDate = LocalDate.parse("2024-08-14");
    private final LocalDate createdDate = LocalDate.parse("2024-08-22");

    @Test
    void getAllBooks_Test() {
        List<Book> allBooks = List.of(
                new Book("1", "Simon", "Java for Dummies", Genre.HISTORY, "this is a description", "123456isbn", "https://linkToCover", 3, localDate, ReadingStatus.TO_BE_READ, createdDate),
                new Book("2", "Florian", "Java not for Dummies", Genre.THRILLER, "this is a description2", "789012isbn", "https://linkToAnotherCover", 2, localDate, ReadingStatus.TO_BE_READ, createdDate)
        );

        List<Book> expectedBooks = List.of(
                new Book("1", "Simon", "Java for Dummies", Genre.HISTORY, "this is a description", "123456isbn", "https://linkToCover",3, localDate, ReadingStatus.TO_BE_READ, createdDate),
                new Book("2", "Florian", "Java not for Dummies", Genre.THRILLER, "this is a description2", "789012isbn", "https://linkToAnotherCover", 2, localDate, ReadingStatus.TO_BE_READ, createdDate)
        );

        when(bookRepo.findAll()).thenReturn(allBooks);
        List<Book> actualBooks = bookService.getAllBooks();

        verify(bookRepo).findAll();
        assertEquals(expectedBooks, actualBooks);
    }

    @Test
    void getAllBooks_WhenEmpty_ReturnsEmptyList() {
        List<Book> expectedBooks = new ArrayList<>();
        List<Book> actualBooks = bookService.getAllBooks();

        assertEquals(expectedBooks, actualBooks);
    }

    @Test
    void getBook_Test_whenBookExists_thenReturnBook() {
        //GIVEN
        Book book = new Book("1", "George Orwell", "1984", Genre.THRILLER, "this is a description", "123456isbn", "https://linkToCover", 3,localDate, ReadingStatus.TO_BE_READ, createdDate);
        when(bookRepo.findById("1")).thenReturn(Optional.of(book));
        //WHEN
        Book actual = bookService.getBook("1");
        //THEN
        Book expected = new Book("1", "George Orwell", "1984", Genre.THRILLER, "this is a description", "123456isbn", "https://linkToCover", 3,localDate, ReadingStatus.TO_BE_READ, createdDate);
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
    void addABookTest_whenNewBookAsInput_thenReturnNewBook() {
        // GIVEN
        BookDto bookDto = new BookDto("J. K. Rowling", "Harry Potter", Genre.FANTASY, "this is a description", "123456isbn", "https://linkToCover", 3,localDate, ReadingStatus.TO_BE_READ);
        Book bookToSave = new Book("1", bookDto.author(), bookDto.title(), bookDto.genre(), bookDto.description(), bookDto.isbn(), bookDto.cover(), bookDto.rating(), bookDto.publicationDate(), bookDto.readingStatus(), createdDate);
        when(bookRepo.save(bookToSave)).thenReturn(bookToSave);
        when(idService.randomId()).thenReturn(bookToSave.id());

        // WHEN
        Book actual = bookService.saveBook(bookDto);

        // THEN
        Book expected = new Book("1", bookDto.author(), bookDto.title(), bookDto.genre(), bookDto.description(), bookDto.isbn(), bookDto.cover(), bookDto.rating(), bookDto.publicationDate(), bookDto.readingStatus(), createdDate);
        verify(bookRepo).save(bookToSave);
        verify(idService).randomId();
        assertEquals(expected, actual);
    }

    @Test
    void deleteBook_Test() {
        doNothing().when(bookRepo).deleteById("1");
        bookService.deleteBook("1");
        verify(bookRepo).deleteById("1");
    }

    @Test
    void testUpdateBook_Success() {

        // Given
        String id = "1";
        Book existingBook = new Book(id, "author1", "title1", Genre.THRILLER, "description1", "12345678", "cover1", 3,localDate, ReadingStatus.TO_BE_READ, createdDate);
        BookDto updatedBookDto = new BookDto("author2", "title2", Genre.FICTION, "description2", "23456789", "cover2", 3,localDate, ReadingStatus.READING);
        Book updatedBook = new Book("1", "author2", "title2", Genre.FICTION, "description2", "23456789", "cover2", 3,localDate, ReadingStatus.READING, createdDate);

        // When
        when(bookRepo.findById(id)).thenReturn(Optional.of(existingBook));
        when(bookRepo.save(updatedBook)).thenReturn(updatedBook);

        Book result = bookService.updateBook(updatedBookDto, id);

        // Then
        assertNotNull(result);
        assertEquals(updatedBook, result);
        verify(bookRepo).findById(id);
        verify(bookRepo).save(updatedBook);
    }

    @Test
    void testUpdateBook_BookNotFound() {

        // Given
        String id = "1";
        BookDto updatedBookDto = new BookDto("author", "title", Genre.FICTION, "description", "isbn", "cover", 3,localDate, ReadingStatus.TO_BE_READ);
        Book updatedBook = new Book("1", "author", "title", Genre.FICTION, "description", "isbn", "cover", 3,localDate, ReadingStatus.READING, createdDate);

        //When
        when(bookRepo.findById(id)).thenReturn(Optional.empty());

        //Then
        BookNotFoundException thrown = assertThrows(
                BookNotFoundException.class,
                () -> bookService.updateBook(updatedBookDto, id)
        );
        assertEquals("No book found with id: " + id, thrown.getMessage());
        verify(bookRepo).findById(id);
        verify(bookRepo, never()).save(updatedBook);
    }

}