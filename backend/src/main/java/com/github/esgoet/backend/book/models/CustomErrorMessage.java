package com.github.esgoet.backend.book.models;

import java.time.LocalDateTime;

public record CustomErrorMessage(
        String message,
        LocalDateTime timestamp,
        int statusCode
) {}