package com.github.esgoet.backend.user.dto;

import lombok.With;

import java.time.LocalDate;

@With
public record UserDto(
        String userName,
        int readingGoal,
        LocalDate goalDate,
        int readBooks,
        String gitHubId,
        String role
) {
}
