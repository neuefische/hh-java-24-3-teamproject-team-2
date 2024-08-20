import {Book, ReadingStatus} from "../../../types/types.ts";
import BookGallery from "../components/bookGallery/BookGallery.tsx";
import "./BookGalleryPage.css";
import GoToTopButton from "../../../components/goToTopButton/GoToTopButton.tsx";


type BookGalleryPageProps = {
    data: Book[]
}
export default function BookGalleryPage({data}: Readonly<BookGalleryPageProps>) {
    const readingStatuses : ReadingStatus[] = ["TO_BE_READ", "READING", "READ"];

    function formatEnum(enumString :string): string {
        return enumString.split('_').map((letter) => {
            return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
        }).join(enumString != "NON_FICTION" ? " " : "-");
    }

    return (
        <div id={"galleryPage"}>
            {readingStatuses.map((status) => (
                <button>{formatEnum(status)}</button>
            ))}
            <BookGallery data={data} />
            <GoToTopButton/>
        </div>
    );
}