import './App.css'
import axios from "axios"
import {Book} from "./types/types.ts";
import {useEffect, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import BookDetailsPage from "./pages/BookDetailsPage/bookDetailsPage/BookDetailsPage.tsx";
import BookGalleryPage from "./pages/BookGalleryPage/bookGalleryPage/BookGalleryPage.tsx";
import AddBookForm from "./pages/BookGalleryPage/components/addBookButton/AddBookForm.tsx";
import Header from "./components/header/Header.tsx";
import GoToTopButton from "./components/goToTopButton/GoToTopButton.tsx";


export default function App() {

    const [data, setData] = useState<Book[]>([])

    const fetchBooks = () => {
        axios.get("/api/books")
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                alert(error)
            })
    }

    const deleteBook = (id: string) => {
        axios.delete("/api/books/" + id)
            .then((response) => response.status === 200 && fetchBooks())
            .catch((error) => console.log(error.message))


    }

    useEffect(() => {
        fetchBooks()
    }, []);


    return (
        <>
            <Header/>
            <GoToTopButton></GoToTopButton>
            <Link to={"/books"}>All Books</Link>
            <Routes>
                <Route path={"/books"} element={<BookGalleryPage data={data}/>}/>
                <Route path={"/books/add"} element={<AddBookForm fetchBooks={fetchBooks}/>}/>
                <Route path={"/books/:id"} element={<BookDetailsPage deleteBook={deleteBook}/>}/>
            </Routes>
        </>
    )
}


