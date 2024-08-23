import {Book, Filter} from "../../../types/types.ts";
import BookGallery from "../components/bookGallery/BookGallery.tsx";
import "./BookGalleryPage.css";
import GoToTopButton from "../../../components/goToTopButton/GoToTopButton.tsx";
import {Dispatch, SetStateAction, useState} from "react";
import SearchBar from "../components/searchBar/SearchBar.tsx";
import StatusFilter from "../components/statusFilter/StatusFilter.tsx";
import FilterForm from "../components/filterForm/FilterForm.tsx";
import {formatEnum} from "../../../utils/utilFunctions.ts";
import SortOptions from "../components/sortOptions/SortOptions.tsx";
import {STAR_RATINGS} from "../../../utils/utilConstants.ts";

type BookGalleryPageProps = {
    filteredBooks: Book[],
    setSearchInput: Dispatch<SetStateAction<string>>
}

export default function BookGalleryPage({filteredBooks, setSearchInput}: BookGalleryPageProps) {
    const [statusFilter, setStatusFilter] = useState<string>("ALL")
    const [selectedFilter, setSelectedFilter] = useState<Filter>({genre: undefined, rating: undefined});
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [showFilterTag, setShowFilterTag] = useState<boolean>(false);
    const [sortRatingDesc, setSortRatingDesc] = useState<boolean | null>(null);
    const [sortGenreDesc, setSortGenreDesc] = useState<boolean | null>(null);
    const [sortABCDesc, setSortABCDesc] = useState<boolean | null>(null);

    const handleApplyFilter = (filter: Filter) => {
        setShowFilter(false);
        setShowFilterTag(filter.genre !== undefined || filter.rating !== undefined);
    }

    const handleRemoveFilter = (removeGenreFilter: boolean, removeRatingFilter: boolean) => {
        if (removeGenreFilter) setSelectedFilter({...selectedFilter, genre: undefined})
        if (removeRatingFilter) setSelectedFilter({...selectedFilter, rating: undefined})
        if (selectedFilter.genre === undefined && removeRatingFilter || selectedFilter.rating === undefined && removeGenreFilter) {
            setShowFilterTag(false);
        }
    }

    const sortAlphabetically = (a: string, b:string, descending: boolean) => {
        const multiplier : number = descending ? 1 : -1;
        if (a < b) return -1 * multiplier;
        if (a > b) return multiplier;
        return 0
    }

    const filteredAndSortedBooks = filteredBooks
        .filter((book) => statusFilter !== "ALL" ? book.readingStatus === statusFilter : book)
        .filter(book => selectedFilter.genre ? book.genre === selectedFilter.genre : book)
        .filter((book) => selectedFilter.rating ? book.rating === Number(selectedFilter.rating) : book)
        .sort((a, b) => sortRatingDesc ? b.rating - a.rating : a.rating - b.rating)
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
                    <FilterForm
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                        handleApplyFilter={handleApplyFilter}
                        setShowFilterTag={setShowFilterTag}
                    />
                }
                {(showFilterTag && !showFilter) &&
                    <div className={"filter-tag-area"}>
                        <p className={"book-label"}>Filters: </p>
                        <div className={"filter-tag"}>
                            {selectedFilter.genre && <button
                                className={"filter-tag-close"}
                                onClick={()=>handleRemoveFilter(true, false)}
                            >{formatEnum(selectedFilter.genre)} x
                            </button>}
                            {selectedFilter.rating  && <button
                                className={"filter-tag-close"}
                                onClick={() => handleRemoveFilter(false, true)}
                            >{STAR_RATINGS[selectedFilter.rating]} x
                            </button>}
                        </div>
                    </div>
                }
            </div>
            <StatusFilter
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />
            <div className={"gallery-sort"}>
                <SortOptions setSortABCDesc={setSortABCDesc} setSortGenreDesc={setSortGenreDesc} setSortRatingDesc={setSortRatingDesc} sortABCDesc={sortABCDesc} sortGenreDesc={sortGenreDesc} sortRatingDesc={sortRatingDesc}/>
                <div className={"number-of-books"}>
                    {
                        filteredAndSortedBooks.length == 1
                            ? filteredAndSortedBooks.length + " book"
                            : filteredAndSortedBooks.length + " books"
                    }
                </div>
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