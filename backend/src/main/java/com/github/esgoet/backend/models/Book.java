package com.github.esgoet.backend.models;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

@With
@Document("books")
public record Book(
        String id,
        String author,
        String title) {
}
