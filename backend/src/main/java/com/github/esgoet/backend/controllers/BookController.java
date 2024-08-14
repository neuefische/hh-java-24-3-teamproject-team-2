package com.github.esgoet.backend.controllers;

import com.github.esgoet.backend.models.Book;
import com.github.esgoet.backend.services.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;


    @GetMapping
    public List<Book> getBooks() {
        return bookService.getAllBooks();
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable String id) {
        bookService.deleteBook(id);
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable String id) {
        return bookService.getBook(id);
    }
}
