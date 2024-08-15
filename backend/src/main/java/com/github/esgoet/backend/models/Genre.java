package com.github.esgoet.backend.models;

public enum Genre {
    NONE("none"),
    FICTION("Fiction"),
    MYSTERY("Mystery"),
    THRILLER("Thriller"),
    FANTASY("Fantasy"),
    SCIENCE("Science"),
    NON_FICTION("None Fiction"),
    HISTORY("History"),
    NOVEL("Novel");

    private final String genre;

    Genre(String genre) { this.genre = genre; }

    public String getGenre() { return genre; }
}
