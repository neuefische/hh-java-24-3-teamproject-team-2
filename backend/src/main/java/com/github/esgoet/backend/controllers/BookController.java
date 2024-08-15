package com.github.esgoet.backend.controllers;

import com.github.esgoet.backend.models.Book;
import com.github.esgoet.backend.services.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;


    @GetMapping
    public List<Book> getBooks() {
        return bookService.getAllBooks();
    }

    @PutMapping(path = {"{id}/update", "{id}"})
    Book update(@PathVariable String id, @RequestBody Book book) {
        if (!book.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The id in the url does not match the request body's id");
        }
        return bookService.update(book);
    }


    @GetMapping("/{id}")
    public Book getBook(@PathVariable String id) {
        return bookService.getBook(id);
    }
}
