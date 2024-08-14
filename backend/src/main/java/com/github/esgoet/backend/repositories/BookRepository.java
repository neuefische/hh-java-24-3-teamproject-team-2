package com.github.esgoet.backend.repositories;

import com.github.esgoet.backend.models.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;


@Repository
public interface BookRepository extends MongoRepository<Book, String> {

    final Map<String, Book> books = new HashMap<>();

    public default Book update(Book book) {
        books.put(book.id(), book);
        return book;
    }
}
