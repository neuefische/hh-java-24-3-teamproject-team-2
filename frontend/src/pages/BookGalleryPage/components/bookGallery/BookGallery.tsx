import BookCard from "../bookCard/BookCard.tsx";
import {Book} from "../../../../types/types.ts";
import "./BookGallery.css";

type BookGalleryProps = {
    data: Book[]
}

export default function BookGallery({data}: Readonly<BookGalleryProps>) {
    return (
         <ul id={"bookGallery"}>
            {
                data.map((book) => (
                    <BookCard book={book} key={book.id}/>
                ))
            }
        </ul>
    );
}