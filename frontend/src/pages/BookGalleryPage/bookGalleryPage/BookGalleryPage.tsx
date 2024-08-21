import BookGallery from "../components/bookGallery/BookGallery.tsx";
import "./BookGalleryPage.css";
import GoToTopButton from "../../../components/goToTopButton/GoToTopButton.tsx";
import {useState} from "react";
import FilterPage from "../../../components/filterPage/FilterPage.tsx";
import {formatGenre} from "../../../components/functions/FormatGenre.ts";
import {Dispatch, SetStateAction} from "react";
import {Book} from "../../../types/types.ts";
import SearchBar from "../components/searchbar/SearchBar.tsx";

type BookGalleryPageProps = {
    filteredBooks: Book[],
    setSearchInput: Dispatch<SetStateAction<string>>
}

export default function BookGalleryPage({filteredBooks, setSearchInput}: BookGalleryPageProps) {

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [selectedGenre, setSelectedGenre] = useState<string>("Select");
    const [filteredDataByGenre, setFilteredDataByGenre] = useState<Book[]>(filteredBooks);
    const [showFilterTag, setShowFilterTag] = useState<boolean>(false);

    const handleClick = () => {
        setShowFilter(!showFilter);
    }

    const handleApplyFilter = () => {
        const filteredByGenre = selectedGenre === "Select" || selectedGenre === "NONE"
            ? filteredBooks
            : filteredBooks.filter(book => book.genre === selectedGenre);

        setFilteredDataByGenre(filteredByGenre);

        setShowFilter(false);
        setShowFilterTag(selectedGenre !== "Select");
    }

    const handleRemoveFilter = () => {
        setFilteredDataByGenre(filteredBooks);
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
            {
                filteredBooks.length > 0
                    ? <BookGallery data={filteredBooks.filter(book => selectedGenre !== 'Select' ? book.genre === selectedGenre : book)}/>
                    : <p>No Books found</p>
            }
            <GoToTopButton/>
        </div>
    );
}