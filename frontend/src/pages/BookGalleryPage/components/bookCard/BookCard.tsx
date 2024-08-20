import "./BookCard.css"

import {Book} from "../../../../types/types.ts";
import {Link} from "react-router-dom";
import StarRating from "../../../../components/starRating/StarRating.tsx";

type BookCardProps = {
    book: Book
}

export default function BookCard({book}: Readonly<BookCardProps>) {

    return (

        <li className={"book-card"}>
            <img className={"cover"} alt={`${book.title} Book Cover`} src={`${book.cover}`}/>
            <div className={"book-info"}>
                <h4>{book.title}</h4>
                <p className={"author"}>By {book.author}</p>
            </div>
            <div className={"book-buttons"}>
                <StarRating
                    size={"small"}
                    editable={false}
                    ratingValue={book.rating}
                />
                <Link className={"book-button align-right"} to={`/books/${book.id}`}>Details</Link>
            </div>
        </li>

    );
}