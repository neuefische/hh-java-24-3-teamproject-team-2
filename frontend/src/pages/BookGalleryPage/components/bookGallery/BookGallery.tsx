import BookCard from "../bookCard/BookCard.tsx";
import {Book} from "../../../../types/types.ts";

type BookGalleryProps = {
    data: Book[]
}

export default function BookGallery({data}: BookGalleryProps) {
    return (
         <ul>
            {
                data.map((book) => (
                    <BookCard book={book} key={book.id}/>
                ))
            }
        </ul>
    );
}