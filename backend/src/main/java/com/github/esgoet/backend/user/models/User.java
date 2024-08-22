package com.github.esgoet.backend.user.models;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@With
@Document("users")
public record User (
        String id,
        String userName,
        int readingGoal,
        LocalDate goalDate,
        int readBooks
) {

}
