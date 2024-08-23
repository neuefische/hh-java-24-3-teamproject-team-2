import {Genre, ReadingStatus} from "../types/types.ts";

export const STAR_RATINGS: string[] = ["☆☆☆☆☆","★☆☆☆☆","★★☆☆☆","★★★☆☆","★★★★☆","★★★★★"];

export const GENRES : Genre[] = ["NONE", "FICTION", "MYSTERY", "THRILLER",
    "FANTASY", "SCIENCE", "NON_FICTION", "HISTORY", "NOVEL", "HISTORICAL_FICTION", "SCIENCE_FICTION",
    "ROMANCE", "YOUNG_ADULT", "ADVENTURE", "HORROR"];

export const READING_STATUSES : ReadingStatus[] = ["TO_BE_READ", "READING", "READ"]