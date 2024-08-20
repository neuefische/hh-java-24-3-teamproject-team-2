import BookGallery from "../components/bookGallery/BookGallery.tsx";
import "./BookGalleryPage.css";
import GoToTopButton from "../../../components/goToTopButton/GoToTopButton.tsx";
import {Dispatch, SetStateAction} from "react";
import {Book} from "../../../types/types.ts";
import SearchBar from "../components/searchbar/SearchBar.tsx";

type BookGalleryPageProps =
    {
        filteredBooks: Book[],
        setSearchInput: Dispatch<SetStateAction<string>>
    }

export default function BookGalleryPage({filteredBooks, setSearchInput}: BookGalleryPageProps) {
    return (
        <div id={"galleryPage"}>
            <SearchBar setSearchInput={setSearchInput}/>
            {
                filteredBooks.length > 0
                    ? <BookGallery data={filteredBooks}/>
                    : <p>No Books found</p>
            }
            <GoToTopButton/>
        </div>
    );
}