import "./BookCard.css"

import {Book} from "../../../../types/types.ts";
import {Link} from "react-router-dom";

type BookCardProps = {
    book: Book
}

export default function BookCard({book}: BookCardProps) {
        return (

        <li>
            <img className={"cover"} alt={`${book.title} Book Cover`}/>
            <div className={"book-info"}>
                <h4>{book.title}</h4>
                <p className={"author"}>By {book.author}</p>
            </div>
            <div className={"book-buttons"}>
                <Link className={"book-button align-right"} to={`/books/${book.id}`}>Details</Link>
            </div>
        </li>

    );
}