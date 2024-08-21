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

    const handleApplyFilter = (genre: string) => {
        setShowFilter(false);
        setShowFilterTag(genre !== "Select");
    }

    const handleRemoveFilter = () => {
        setShowFilterTag(false);
        setSelectedGenre('Select');
    }

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
            <RatingFilter setRatingFilter={setRatingFilter}
            />
            <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter}/>
            {
                filteredBooks.length > 0
                    ? <BookGallery
                        data={
                            filteredBooks.filter(book => selectedGenre !== 'Select' ? book.genre === selectedGenre : book)
                                .filter((book) => statusFilter != "ALL" ? book.readingStatus === statusFilter : book)
                                .filter(book => ratingFilter !== null ? book.rating === ratingFilter : book)
                        }/>
                    : <p>No Books found</p>
            }
            <GoToTopButton/>
        </div>
    );
}