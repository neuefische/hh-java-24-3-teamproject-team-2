package com.github.esgoet.backend.services;

import com.github.esgoet.backend.dto.NewBookDto;
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

    public Book saveBook(NewBookDto newBookDto) {
        Book bookToSave = new Book(
                idService.randomId(),
                newBookDto.author(),
                newBookDto.title(),
                newBookDto.genre(),
                newBookDto.publicationDate()
        );
        return bookRepository.save(bookToSave);
    }
}
