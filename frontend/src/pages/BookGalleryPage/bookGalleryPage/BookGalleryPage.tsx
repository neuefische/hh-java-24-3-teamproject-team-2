import {Book} from "../../../types/types.ts";
import BookGallery from "../components/bookGallery/BookGallery.tsx";
import "./BookGalleryPage.css";
import {Link} from "react-router-dom";

type BookGalleryPageProps = {
    data: Book[]
}
export default function BookGalleryPage({data}: Readonly<BookGalleryPageProps>) {
    return (
        <div id={"galleryPage"}>
            <Link className={"book-button align-right"} to={"/books/add"}>Add a Book</Link>
            <BookGallery data={data} />
        </div>
    );
}