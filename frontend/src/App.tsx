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
import LoginPage from "./pages/LoginPage/loginPage/LoginPage.tsx";

export default function App() {

    const [data, setData] = useState<Book[]>([])
    const [user, setUser] = useState<User | null | undefined>()

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

    const updateBook = (id: string, book: BookWithoutId) => {
        axios.put(`/api/books/${id}/update`, book)
            .then((response) => response.status === 200 && fetchBooks())
            .catch((error) => console.log(error.response.data))
    }

    const updateUser = (updatedProperty: string, updatedValue: number | string) => {
        axios.put(`/api/users/${user?.id}`, {...user, [updatedProperty]: updatedValue})
            .then((response) => response.status === 200 && loadUser())
    }
    const loadUser = () => {
        axios.get("/api/auth/me")
            .then((response) => setUser(response.data))
            .catch(() => setUser(null))
    }


    useEffect(() => {
        fetchBooks()
        loadUser()
    }, []);

    const [searchInput, setSearchInput] = useState("")

    const filteredBooks: Book[] = data
        .filter((book) => book.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
            book.author?.toLowerCase().includes(searchInput.toLowerCase()));

    const login = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin
        window.open(host + '/oauth2/authorization/github', '_self')
    }
    const logout = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin
        window.open(host + "/logout", "_self")
    }


    return (
        <>
            <Header user={user} logout={logout}/>
            {user && <Navigation/>}
            <main>
                <Routes>
                    <Route path={"/login"} element={<LoginPage login={login}/>}/>
                    <Route path={"/"} element={<Dashboard user={user} data={data}/>}/>
                    <Route path={"/books"}
                           element={<BookGalleryPage filteredBooks={filteredBooks} setSearchInput={setSearchInput}/>}/>

                    {user &&<Route path={"/books/add"}
                           element={<AddBookPage fetchBooks={fetchBooks} user={user} updateUser={updateUser}/>}/>}
                    {user && <Route path={"/books/:id"}
                           element={<BookDetailsPage deleteBook={deleteBook} updateBook={updateBook} user={user}
                                                     updateUser={updateUser}/>}/>}
                    {user && <Route path={"/settings"} element={<SettingsPage user={user} updateUser={updateUser}/>}/>}
                </Routes>
            </main>
        </>
    )
}


