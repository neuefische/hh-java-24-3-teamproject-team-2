import './App.css'
import axios from "axios"
import {Book} from "./types/types.ts";
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import BookDetailsPage from "./pages/BookDetailsPage/bookDetailsPage/BookDetailsPage.tsx";
import BookGalleryPage from "./pages/BookGalleryPage/bookGalleryPage/BookGalleryPage.tsx";
import AddBookForm from "./pages/BookGalleryPage/components/addBookForm/AddBookForm.tsx";
import Header from "./components/header/Header.tsx";
import Navigation from "./components/navigation/Navigation.tsx";
import Dashboard from "./pages/DashboardPage/dashboard/Dashboard.tsx";

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

    const [searchInput, setSearchInput] = useState("")

    const filteredBooks: Book[] = data
        .filter((book) => book.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
            book.author?.toLowerCase().includes(searchInput.toLowerCase()));
    
    return (
        <>
            <Header/>
            <Navigation/>
            <main>
                <Routes>
                    <Route path={"/"} element={<Dashboard/>}/>
                    <Route path={"/books"} element={<BookGalleryPage
                        filteredBooks={filteredBooks}
                        setSearchInput={setSearchInput}/>}/>
                    <Route path={"/books/add"} element={<AddBookForm fetchBooks={fetchBooks}/>}/>
                    <Route path={"/books/:id"} element={<BookDetailsPage deleteBook={deleteBook}/>}/>
                </Routes>
            </main>
        </>
    )
}


