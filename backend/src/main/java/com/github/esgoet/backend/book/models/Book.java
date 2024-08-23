package com.github.esgoet.backend.book.models;

import lombok.With;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@With
@Document("books")
public record Book(
        String id,
        String author,
        String title,
        Genre genre,
        String description,
        String isbn,
        String cover,
        int rating,
        LocalDate publicationDate,
        ReadingStatus readingStatus,
        @CreatedDate
        LocalDate createdDate
) {
}
