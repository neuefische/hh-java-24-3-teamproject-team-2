import "./BookCard.css"

import {Book} from "../../types/types.ts";
import axios from "axios";

type BookCardProps = {
    book: Book
}

const deleteBook = (id: string) => {
    axios.delete("api/books/" + id)
        .catch((error) => alert(error.message))
}

export default function BookCard({book}: BookCardProps) {
    return (

        <li>
            <p>Id: {book.id}</p>
            <p>Title: {book.title}</p>
            <p>Author:{book.author}</p>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
        </li>

    );
}