import {Book} from "../../../types/types.ts";
import BookGallery from "../components/bookGallery/BookGallery.tsx";
import "./BookGalleryPage.css";

type BookGalleryPageProps = {
    data: Book[]
}
export default function BookGalleryPage({data}: BookGalleryPageProps) {
    return (
        <>
            <BookGallery data={data} />
        </>
    );
}