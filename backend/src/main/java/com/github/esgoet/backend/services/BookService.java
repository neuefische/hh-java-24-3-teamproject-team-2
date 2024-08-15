package com.github.esgoet.backend.services;

import com.github.esgoet.backend.models.Book;
import com.github.esgoet.backend.models.BookNotFoundException;
import com.github.esgoet.backend.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBook(String id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("No book found with id: " + id));
    }

    public Book updateBook(Book updateBook, String id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("No book found with id: " + id))
                .withAuthor(updateBook.author())
                .withCover(updateBook.cover())
                .withDescription(updateBook.description())
                .withGenre(updateBook.genre())
                .withTitle(updateBook.title())
                .withIsbn(updateBook.isbn());
        return bookRepository.save(book);
    }
}
