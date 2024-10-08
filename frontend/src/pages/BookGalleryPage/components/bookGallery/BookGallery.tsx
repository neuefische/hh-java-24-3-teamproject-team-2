import BookCard from "../bookCard/BookCard.tsx";
import {Book, Genre} from "../../../../types/types.ts";
import "./BookGallery.css";
import {formatEnum} from "../../../../utils/utilFunctions.ts";
import {STAR_RATINGS} from "../../../../utils/utilConstants.ts";

type BookGalleryProps = {
    data: Book[],
    sortGenreDesc: boolean | null,
    sortRatingDesc: boolean | null,
}

export default function BookGallery({data, sortGenreDesc, sortRatingDesc}: Readonly<BookGalleryProps>) {
    const currentGenres : Genre[] = data.map((book) => book.genre).filter((genre, index, array) => !index || genre != array[index-1]);
    const currentRatings : number[] = data.map((book) => book.rating).filter((rating, index, array) => !index || rating !=array[index-1]);

    return (
         <ul id={"book-gallery"}>
            {
                sortGenreDesc !== null ? currentGenres.map((genre) => (
                    <li key={`${genre}-map`}>
                        <span className={"highlight category-title"}>{formatEnum(genre)}</span>
                        <ul className={"category"}>
                            {data.map((book) => book.genre === genre && <BookCard book={book} key={book.id}/>)}
                        </ul>
                    </li>
                )) : sortRatingDesc !== null ? currentRatings.map((rating) =>
                        <li key={`${rating}-map`}>
                            <span className={"highlight category-title"}>{STAR_RATINGS[rating]}</span>
                            <ul className={"category"}>
                                {data.map((book) => book.rating === rating && <BookCard book={book} key={book.id}/>)}
                            </ul>
                        </li>
                    ) :
                    data.map((book) => <BookCard book={book} key={book.id}/>)
            }
         </ul>
    );
}