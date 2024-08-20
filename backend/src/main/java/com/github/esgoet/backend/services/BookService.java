package com.github.esgoet.backend.services;

import com.github.esgoet.backend.dto.BookDto;
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
    private final IdService idService;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public void deleteBook(String id) {
        bookRepository.deleteById(id);
    }

    public Book getBook(String id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("No book found with id: " + id));
    }

    public Book saveBook(BookDto bookDto) {
        System.out.println(bookDto);
        Book bookToSave = new Book(
                idService.randomId(),
                bookDto.author(),
                bookDto.title(),
                bookDto.genre(),
                bookDto.description(),
                bookDto.isbn(),
                bookDto.cover(),
                bookDto.rating(),
                bookDto.publicationDate(),
                bookDto.readingStatus()
        );
        System.out.println(bookToSave);
        return bookRepository.save(bookToSave);
    }

    public Book updateBook(BookDto updateBook, String id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("No book found with id: " + id))
                .withAuthor(updateBook.author())
                .withCover(updateBook.cover())
                .withDescription(updateBook.description())
                .withGenre(updateBook.genre())
                .withTitle(updateBook.title())
                .withIsbn(updateBook.isbn())
                .withRating(updateBook.rating())
                .withReadingStatus(updateBook.readingStatus());
        return bookRepository.save(book);
    }
}
