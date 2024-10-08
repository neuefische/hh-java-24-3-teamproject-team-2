package com.github.esgoet.backend.book.models;

public enum Genre {
    NONE("none"),
    FICTION("Fiction"),
    MYSTERY("Mystery"),
    THRILLER("Thriller"),
    FANTASY("Fantasy"),
    SCIENCE("Science"),
    NON_FICTION("Non-fiction"),
    HISTORY("History"),
    NOVEL("Novel"),
    HISTORICAL_FICTION("Historical fiction"),
    SCIENCE_FICTION("Science fiction"),
    ROMANCE("Romance"),
    YOUNG_ADULT("Young adult"),
    ADVENTURE("Adventure"),
    HORROR("Horror");

    private final String genreValue;

    Genre(String genreValue) { this.genreValue = genreValue; }

    public String getGenre() { return genreValue; }
}
