export type Book = {
    id: string,
    author: string,
    title: string
    description: string,
    genre: Genre,
    isbn: string,
    cover: string,
    rating: number,
    publicationDate: string,
    readingStatus: ReadingStatus
}

export type BookWithoutId = {
    title: string,
    author: string,
    description: string,
    genre: Genre,
    isbn: string,
    cover: string
    rating: number,
    publicationDate: string,
    readingStatus: ReadingStatus
}

export type ReadingStatus = "TO_BE_READ" | "READING" | "READ";

export type Genre = "NONE" | "FICTION" | "MYSTERY" | "THRILLER" |
    "FANTASY" | "SCIENCE" | "NON_FICTION" | "HISTORY" |
    "NOVEL" | "HISTORICAL_FICTION" | "SCIENCE_FICTION" |
    "ROMANCE" | "YOUNG_ADULT" | "ADVENTURE" | "HORROR";