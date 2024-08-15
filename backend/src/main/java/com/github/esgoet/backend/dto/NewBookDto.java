package com.github.esgoet.backend.dto;

import com.github.esgoet.backend.models.Genre;
import lombok.With;

import java.time.LocalDate;

@With
public record NewBookDto(
    String author,
    String title,
    Genre genre,
    LocalDate publicationDate
) {
}
