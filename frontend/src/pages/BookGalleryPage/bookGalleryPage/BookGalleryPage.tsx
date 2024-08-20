import {Book, ReadingStatus} from "../../../types/types.ts";
import BookGallery from "../components/bookGallery/BookGallery.tsx";
import "./BookGalleryPage.css";
import GoToTopButton from "../../../components/goToTopButton/GoToTopButton.tsx";
import {Dispatch, SetStateAction} from "react";
import SearchBar from "../components/searchbar/SearchBar.tsx";

type BookGalleryPageProps =
{
    filteredBooks: Book[],
    setSearchInput: Dispatch<SetStateAction<string>>
}

export default function BookGalleryPage({filteredBooks, setSearchInput}: BookGalleryPageProps) {
    const readingStatuses : ReadingStatus[] = ["TO_BE_READ", "READING", "READ"];

    function formatEnum(enumString :string): string {
        return enumString.split('_').map((letter) => {
            return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
        }).join(enumString != "NON_FICTION" ? " " : "-");
    }

    return (
        <div id={"galleryPage"}>
            <SearchBar setSearchInput={setSearchInput}/>
            {readingStatuses.map((status) => (
                <button>{formatEnum(status)}</button>
            ))}
            {
                filteredBooks.length > 0
                    ? <BookGallery data={filteredBooks}/>
                    : <p>No Books found</p>
            }
            <GoToTopButton/>
        </div>
    );
}