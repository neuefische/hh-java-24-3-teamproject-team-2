package com.github.esgoet.backend.repositories;

import com.github.esgoet.backend.models.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {

}
