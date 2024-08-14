import './App.css'
import "./types/types.ts"
import axios from "axios"
import {Book} from "./types/types.ts";
import {useEffect, useState} from "react";
import BookGallery from "./components/bookGallery/BookGallery.tsx";


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

    console.log(data)

    return (
    <>
        <h1>LibraryApp</h1>
        <h3>Cool motto ( ͡° ͜ʖ ͡°)</h3>
        <BookGallery data={data}/>
    </>
    )
}

export default App
