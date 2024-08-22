import {Book, ReadingStatus} from "../types/types.ts";

export function formatEnum(enumString :string): string {
    return enumString.split('_').map((letter) => {
        return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
    }).join(enumString != "NON_FICTION" ? " " : "-");
}

export const getSizeOfData = (data: Book[], status: ReadingStatus): number => {
    return data.filter(book => book.readingStatus === status).length;
}