package com.github.esgoet.backend.services;

import com.github.esgoet.backend.dto.NewBookDto;
import com.github.esgoet.backend.models.Book;
import com.github.esgoet.backend.models.BookNotFoundException;
import com.github.esgoet.backend.models.Genre;
import com.github.esgoet.backend.repositories.BookRepository;
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
    void getBook_Test_whenBookExists_thenReturnBook() {
        //GIVEN
        Book book = new Book("1", "George Orwell", "1984", Genre.FANTASY, localDate);
        when(bookRepo.findById("1")).thenReturn(Optional.of(book));
        //WHEN
        Book actual = bookService.getBook("1");
        //THEN
        Book expected = new Book("1", "George Orwell", "1984", Genre.FANTASY, localDate);
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
    void addABookTest_whenNewBookAsInput_thenReturnNewBook() {
        // GIVEN
        NewBookDto newBookDto = new NewBookDto("J. K. Rowling", "Harry Potter", Genre.FANTASY, localDate);
        Book bookToSave = new Book("1", newBookDto.author(), newBookDto.title(), newBookDto.genre(), newBookDto.publicationDate());
        when(bookRepo.save(bookToSave)).thenReturn(bookToSave);
        when(idService.randomId()).thenReturn(bookToSave.id());

        // WHEN
        Book actual = bookService.saveBook(newBookDto);

        // THEN
        Book expected = bookToSave;
        verify(bookRepo).save(new Book("1", newBookDto.author(), newBookDto.title(), newBookDto.genre(), newBookDto.publicationDate()));
        verify(idService).randomId();
        assertEquals(expected, actual);
    }

    @Test
    void deleteBook_Test() {
        doNothing().when(bookRepo).deleteById("1");
        bookService.deleteBook("1");
        verify(bookRepo).deleteById("1");
    }
}