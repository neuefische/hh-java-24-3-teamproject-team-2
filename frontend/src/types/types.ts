export type Book = {
    id: string,
    author: string,
    title: string
    description: string,
    genre: string,
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
    genre: string,
    isbn: string,
    cover: string
    rating: number,
    publicationDate: string,
    readingStatus: ReadingStatus
}

export type ReadingStatus = "TO_BE_READ" | "READING" | "READ";

export type Genre = {
    NONE: string,
    FICTION: string,
    MYSTERY: string,
    THRILLER: string,
    FANTASY: string,
    SCIENCE: string,
    NON_FICTION: string,
    HISTORY: string,
    NOVEL: string,
    HISTORICAL_FICTION: string,
    SCIENCE_FICTION: string,
    ROMANCE: string,
    YOUNG_ADULT: string,
    ADVENTURE: string,
    HORROR: string
}
