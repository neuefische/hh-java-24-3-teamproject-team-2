import {Book} from "../../../types/types.ts";
import BookGallery from "../components/bookGallery/BookGallery.tsx";
import "./BookGalleryPage.css";
import AddBookButton from "../components/addBookButton/AddBookButton.tsx";
import {Link} from "react-router-dom";

type BookGalleryPageProps = {
    data: Book[]
}
export default function BookGalleryPage({data}: BookGalleryPageProps) {
    return (
        <>
            <Link to={"/books/add"}><AddBookButton /></Link>
            <BookGallery data={data} />
        </>
    );
}