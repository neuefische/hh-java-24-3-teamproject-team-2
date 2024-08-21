import {Book} from "../../../types/types.ts";
import BookGallery from "../components/bookGallery/BookGallery.tsx";
import "./BookGalleryPage.css";
import GoToTopButton from "../../../components/goToTopButton/GoToTopButton.tsx";
import {Dispatch, SetStateAction, useState} from "react";
import SearchBar from "../components/searchBar/SearchBar.tsx";
import StatusFilter from "../components/statusFilter/StatusFilter.tsx";
import RatingFilter from "../components/ratingFilter/RatingFilter.tsx";

type BookGalleryPageProps =
    {
        filteredBooks: Book[],
        setSearchInput: Dispatch<SetStateAction<string>>
    }

export default function BookGalleryPage({filteredBooks, setSearchInput}: BookGalleryPageProps) {
    const [statusFilter, setStatusFilter] = useState<string>("ALL")


    return (
        <div id={"galleryPage"}>
            <SearchBar setSearchInput={setSearchInput}/>
            <RatingFilter/>
            <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter}/>
            {
                filteredBooks.length > 0
                    ? <BookGallery
                        data={filteredBooks.filter((book) => statusFilter != "ALL" ? book.readingStatus === statusFilter : book)}/>
                    : <p>No Books found</p>
            }
            <GoToTopButton/>
        </div>
    );
}