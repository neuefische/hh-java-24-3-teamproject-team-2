import "./BookCard.css"

import {Book} from "../../../../types/types.ts";
import {Link} from "react-router-dom";

type BookCardProps = {
    book: Book
}

export default function BookCard({book}: BookCardProps) {

    return (

        <li>
            <p>Id: {book.id}</p>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <Link to={`/books/${book.id}`}>Details</Link>
        </li>

    );
}