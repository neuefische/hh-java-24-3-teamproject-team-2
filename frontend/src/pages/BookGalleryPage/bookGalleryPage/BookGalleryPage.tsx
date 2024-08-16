import {Book} from "../../../types/types.ts";
import BookGallery from "../components/bookGallery/BookGallery.tsx";
import "./BookGalleryPage.css";
import GoToTopButton from "../../../components/goToTopButton/GoToTopButton.tsx";


type BookGalleryPageProps = {
    data: Book[]
}
export default function BookGalleryPage({data}: Readonly<BookGalleryPageProps>) {
    return (
        <div id={"galleryPage"}>
            <BookGallery data={data} />
            <GoToTopButton/>
        </div>
    );
}