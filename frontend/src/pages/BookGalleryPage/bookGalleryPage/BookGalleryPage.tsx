import {Book} from "../../../types/types.ts";
import BookGallery from "../components/bookGallery/BookGallery.tsx";
import "./BookGalleryPage.css";
import GoToTopButton from "../../../components/goToTopButton/GoToTopButton.tsx";
import {Dispatch, SetStateAction, useState} from "react";
import FilterPage from "../../../components/filterPage/FilterPage.tsx";
import {formatGenre} from "../../../components/functions/FormatGenre.ts";
import SearchBar from "../components/searchbar/SearchBar.tsx";
import StatusFilter from "../components/statusFilter/StatusFilter.tsx";

type BookGalleryPageProps = {
    filteredBooks: Book[],
    setSearchInput: Dispatch<SetStateAction<string>>
}

export default function BookGalleryPage({filteredBooks, setSearchInput}: BookGalleryPageProps) {
    const [statusFilter, setStatusFilter] = useState<string>("ALL")



    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [selectedGenre, setSelectedGenre] = useState<string>("Select");
    const [showFilterTag, setShowFilterTag] = useState<boolean>(false);

    const handleClick = () => {
        setShowFilter(!showFilter);
    }

    const handleApplyFilter = (genre: string) => {
        setShowFilter(false);
        console.log(genre);
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
                    onClick={handleClick}
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
                            <p className={"filter-tag-genre"}>{formatGenre(selectedGenre)}</p>
                            <button className={"filter-tag-close"} onClick={handleRemoveFilter}>x</button>
                        </div>
                    </div>
                }
            </div>
            <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter}/>
            {
                filteredBooks.length > 0
                    ? <BookGallery data={filteredBooks.filter(book => selectedGenre !== 'Select' ? book.genre === selectedGenre : book)
                        .filter((book) => statusFilter != "ALL" ? book.readingStatus === statusFilter : book)}/>
                    : <p>No Books found</p>
            }
            <GoToTopButton/>
        </div>
    );
}