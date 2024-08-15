export type Book = {
    id: string,
    author: string,
    title: string
}

export type NewBook = {
    title: string,
    author: string,
    genre: string,
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
    NOVEL: string
}
