import BookGallery from "../components/bookGallery/BookGallery.tsx";
import "./BookGalleryPage.css";
import GoToTopButton from "../../../components/goToTopButton/GoToTopButton.tsx";
import Searchbar from "../components/searchbar/Searchbar.tsx";


export default function BookGalleryPage({filteredBooks, setSearchInput}: any) {
    return (
        <div id={"galleryPage"}>
            <Searchbar setSearchInput={setSearchInput}/>
            {
                filteredBooks.length > 0
                    ? <BookGallery data={filteredBooks}/>
                    : <p>No Books found</p>
            }
            <GoToTopButton/>
        </div>
    );
}