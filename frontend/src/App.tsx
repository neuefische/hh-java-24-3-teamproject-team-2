import './App.css'
import axios from "axios"
import {Book, BookWithoutId, User} from "./types/types.ts";
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import BookDetailsPage from "./pages/BookDetailsPage/bookDetailsPage/BookDetailsPage.tsx";
import BookGalleryPage from "./pages/BookGalleryPage/bookGalleryPage/BookGalleryPage.tsx";
import AddBookPage from "./pages/AddBookPage/addBookPage/AddBookPage.tsx";
import Header from "./components/header/Header.tsx";
import Navigation from "./components/navigation/Navigation.tsx";
import Dashboard from "./pages/DashboardPage/dashboard/Dashboard.tsx";
import SettingsPage from "./pages/SettingsPage/settingsPage/SettingsPage.tsx";

export default function App() {

    const [data, setData] = useState<Book[]>([])
    const [user, setUser] = useState<User>({id: "", userName: "", readingGoal: 0, goalDate: "", readBooks: 0})

    const fetchBooks = () => {
        axios.get("/api/books")
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                alert(error)
            })
    }

    const fetchUser = () => {
        axios.get("/api/users/1")
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => (console.log(error)))
    }

    const deleteBook = (id: string) => {
        axios.delete("/api/books/" + id)
            .then((response) => response.status === 200 && fetchBooks())
            .catch((error) => console.log(error.message))
    }

    const updateBook = (id: string, book: BookWithoutId) => {
        axios.put(`/api/books/${id}/update`, book)
            .then((response) => response.status === 200 && fetchBooks())
            .catch((error) => console.log(error.response.data))
    }

    const updateUser = (updatedProperty: string, updatedValue: number | string) => {
        axios.put(`/api/users/${user.id}`, {...user, [updatedProperty]: updatedValue})
            .then((response) => response.status === 200 && fetchUser())
    }

    useEffect(() => {
        fetchBooks()
        fetchUser()
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
                    <Route path={"/"} element={<Dashboard user={user}/>}/>
                    <Route path={"/books"} element={<BookGalleryPage filteredBooks={filteredBooks} setSearchInput={setSearchInput}/>}/>
                    <Route path={"/books/add"} element={<AddBookPage fetchBooks={fetchBooks} user={user} updateUser={updateUser}/>}/>
                    <Route path={"/books/:id"} element={<BookDetailsPage deleteBook={deleteBook} updateBook={updateBook} user={user} updateUser={updateUser}/>}/>
                    <Route path={"/settings"} element={<SettingsPage user={user} updateUser={updateUser}/>}/>
                </Routes>
            </main>
        </>
    )
}


