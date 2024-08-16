export type Book = {
    id: string,
    author: string,
    title: string
    description: string,
    genre: string,
    isbn: string,
    cover: string
    publicationDate: string
}

export type NewBook = {
    title: string,
    author: string,
    description: string,
    genre: string,
    isbn: string,
    cover: string
    publicationDate: string
}

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
