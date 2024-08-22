import {Book} from "../../../types/types.ts";
import BookGallery from "../components/bookGallery/BookGallery.tsx";
import "./BookGalleryPage.css";
import GoToTopButton from "../../../components/goToTopButton/GoToTopButton.tsx";
import {Dispatch, SetStateAction, useState} from "react";
import SearchBar from "../components/searchBar/SearchBar.tsx";
import StatusFilter from "../components/statusFilter/StatusFilter.tsx";
import RatingFilter from "../components/ratingFilter/RatingFilter.tsx";
import FilterPage from "../../../components/filterPage/FilterPage.tsx";
import {formatEnum} from "../../../utils/utilFunctions.ts";

type BookGalleryPageProps = {
    filteredBooks: Book[],
    setSearchInput: Dispatch<SetStateAction<string>>
}

export default function BookGalleryPage({filteredBooks, setSearchInput}: BookGalleryPageProps) {
    const [statusFilter, setStatusFilter] = useState<string>("ALL")
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [selectedGenre, setSelectedGenre] = useState<string>("Select");
    const [showFilterTag, setShowFilterTag] = useState<boolean>(false);
    const [ratingFilter, setRatingFilter] = useState<number | null>(null);
    const [sortedBooks, setSortedBooks] = useState<boolean | null>(null)

    const handleApplyFilter = (genre: string) => {
        setShowFilter(false);
        setShowFilterTag(genre !== "Select");
    }

    const handleRemoveFilter = () => {
        setShowFilterTag(false);
        setSelectedGenre('Select');
    }

    const filteredAndSortedBooks = filteredBooks
        .filter(book => selectedGenre !== 'Select' ? book.genre === selectedGenre : book)
        .filter((book) => statusFilter != "ALL" ? book.readingStatus === statusFilter : book)
        .filter(book => ratingFilter !== null ? book.rating === ratingFilter : book)
        .sort((a, b) => sortedBooks ? a.rating - b.rating : b.rating - a.rating);

    return (
        <div id={"galleryPage"}>
            <SearchBar setSearchInput={setSearchInput}/>
            <div className={"filter-sector"}>
                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className={"show-filter-button"}
                >
                    {!showFilter ? "Advanced Search" : "x"}
                </button>
                {showFilter &&
                    <FilterPage
                        selectedGenre={selectedGenre}
                        setSelectedGenre={setSelectedGenre}
                        handleApplyFilter={handleApplyFilter}
                        setShowKeywordTag={setShowFilterTag}
                    />
                }
                {(showFilterTag && !showFilter) &&
                    <div className={"filter-tag-area"}>
                        <p style={{fontStyle: "italic", fontWeight: "bold"}}>Filtered Genre: </p>
                        <div className={"filter-tag"}>
                            <button
                                className={"filter-tag-close"}
                                onClick={handleRemoveFilter}
                            >{formatEnum(selectedGenre)} x
                            </button>
                        </div>
                    </div>
                }
            </div>
            <RatingFilter
                setRatingFilter={setRatingFilter}
                setSortedBooks={setSortedBooks}
            />
            <StatusFilter
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />
            <p className={"number-of-books"}>
                {
                    filteredAndSortedBooks.length == 1
                        ? filteredAndSortedBooks.length + " book"
                        : filteredAndSortedBooks.length + " books"
                }
            </p>
            {
                filteredAndSortedBooks.length > 0
                    ? <BookGallery data={filteredAndSortedBooks}/>
                    : <p style={{textAlign: "center", marginTop: "50px"}}>No Books found</p>
            }
            <GoToTopButton/>
        </div>
    );
}