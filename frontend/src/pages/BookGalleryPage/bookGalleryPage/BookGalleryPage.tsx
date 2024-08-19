import {Book} from "../../../types/types.ts";
import BookGallery from "../components/bookGallery/BookGallery.tsx";
import "./BookGalleryPage.css";
import GoToTopButton from "../../../components/goToTopButton/GoToTopButton.tsx";
import {useState} from "react";
import FilterPage from "../../../components/filterPage/FilterPage.tsx";


type BookGalleryPageProps = {
    data: Book[]
}
export default function BookGalleryPage({data}: Readonly<BookGalleryPageProps>) {

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [selectedGenre, setSelectedGenre] = useState<string>("Select");
    const [filteredDataByGenre, setFilteredDataByGenre] = useState<Book[]>(data);

    const handleClick = () => {
        setShowFilter(!showFilter);
    }

    const handleApplyFilter = () => {
        const filteredData = selectedGenre === "Select" || selectedGenre === "NONE"
            ? data
            : data.filter(book => book.genre === selectedGenre);

        setFilteredDataByGenre(filteredData);
    }


    return (
        <div id={"galleryPage"}>
            <div className={"filter-sector"}>
                <button
                    onClick={handleClick}
                    className={"show-filter-button"}
                >
                    Filter
                </button>
                {showFilter &&
                    <FilterPage
                        selectedGenre={selectedGenre}
                        setSelectedGenre={setSelectedGenre}
                        handleApplyFilter={handleApplyFilter}
                    />
                }
            </div>
            <BookGallery data={filteredDataByGenre} />
            <GoToTopButton/>
        </div>
    );
}