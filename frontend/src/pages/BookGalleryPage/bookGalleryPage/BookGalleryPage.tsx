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
import SortOptions from "../components/sortOptions/SortOptions.tsx";

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
    const [sortRatingDesc, setSortRatingDesc] = useState<boolean | null>(null);
    const [sortGenreDesc, setSortGenreDesc] = useState<boolean | null>(null);
    const [sortABCDesc, setSortABCDesc] = useState<boolean | null>(null);

    const handleApplyFilter = (genre: string) => {
        setShowFilter(false);
        setShowFilterTag(genre !== "Select");
    }

    const handleRemoveFilter = () => {
        setShowFilterTag(false);
        setSelectedGenre('Select');
    }

    const sortAlphabetically = (a: string, b:string, descending: boolean) => {
        const multiplier : number = descending ? 1 : -1;
        if (a < b) return -1 * multiplier;
        if (a > b) return multiplier;
        return 0
    }

    const filteredAndSortedBooks = filteredBooks
        .filter(book => selectedGenre !== 'Select' ? book.genre === selectedGenre : book)
        .filter((book) => statusFilter !== "ALL" ? book.readingStatus === statusFilter : book)
        .filter(book => ratingFilter !== null ? book.rating === ratingFilter : book)
        .sort((a, b) => sortRatingDesc ? a.rating - b.rating : b.rating - a.rating)
        .sort((a,b) => sortABCDesc ? sortAlphabetically(a.title, b.title, true) : sortABCDesc !== null ? sortAlphabetically(a.title, b.title, false): 0 )
        .sort((a,b)=> sortGenreDesc ? sortAlphabetically(a.genre, b.genre, true) : sortGenreDesc !==null ? sortAlphabetically(a.genre, b.genre, false): 0)



    return (
        <div id={"galleryPage"}>

            <div className={"filter-sector"}>
                <SearchBar setSearchInput={setSearchInput}/>
                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className={"show-filter-button"}
                >
                    {!showFilter ? "Advanced Search ◀" : "Advanced Search ▼"}
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
            <StatusFilter
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />
            <SortOptions setSortABCDesc={setSortABCDesc} setSortGenreDesc={setSortGenreDesc} setSortRatingDesc={setSortRatingDesc} sortABCDesc={sortABCDesc} sortGenreDesc={sortGenreDesc} sortRatingDesc={sortRatingDesc}/>

            {/*<RatingFilter*/}
            {/*    setRatingFilter={setRatingFilter}*/}
            {/*/>*/}

            <div className={"number-of-books"}>
                {
                    filteredAndSortedBooks.length == 1
                        ? filteredAndSortedBooks.length + " book"
                        : filteredAndSortedBooks.length + " books"
                }
            </div>
            {
                filteredAndSortedBooks.length > 0
                    ? <BookGallery data={filteredAndSortedBooks} sortGenreDesc={sortGenreDesc} sortRatingDesc={sortRatingDesc}/>
                    : <p style={{textAlign: "center", marginTop: "50px"}}>No Books found</p>
            }
            <GoToTopButton/>
        </div>
    );
}