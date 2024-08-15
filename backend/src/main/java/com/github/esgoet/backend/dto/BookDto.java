package com.github.esgoet.backend.dto;

import com.github.esgoet.backend.models.Genre;
import lombok.With;

import java.time.LocalDate;

@With
public record BookDto(
        String author,
        String title,
        Genre genre,
        String description,
        String isbn,
        String cover,
        LocalDate publicationDate
) {
}
