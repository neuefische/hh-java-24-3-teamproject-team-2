import './App.css'
import "./types/types.ts"
import axios from "axios"
import {Book} from "./types/types.ts";
import {useEffect, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import BookDetailsPage from "./pages/BookDetailsPage/bookDetailsPage/BookDetailsPage.tsx";
import BookGalleryPage from "./pages/BookGalleryPage/bookGalleryPage/BookGalleryPage.tsx";
import EditForm from "./components/editForm/EditForm.tsx";


function App() {

    const[data, setData] = useState<Book[]>([])

    const fetchBooks = () => {
        axios.get("/api/books")
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                alert(error)
            })
    }

    useEffect(() => {
        fetchBooks()
    }, []);



    return (
    <>
        <h1>LibraryApp</h1>
        <h3>Cool motto ( ͡° ͜ʖ ͡°)</h3>
        <Link to={"/books"}>All Books</Link>
        <Routes>
            <Route path={"/books"} element={<BookGalleryPage data={data}/>}/>
            <Route path={"/books/:id"} element={<BookDetailsPage/>}/>
        </Routes>
        <EditForm/>

    </>
    )
}

export default App
