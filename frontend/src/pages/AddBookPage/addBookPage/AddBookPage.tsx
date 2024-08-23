import { FormEvent, useState} from "react";
import {BookWithoutId, User} from "../../../types/types.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./AddBookPage.css";
import BookForm from "../../../components/bookForm/BookForm.tsx";

type FetchProps = {
    fetchBooks: () => void,
    user: User,
    updateUser: (updatedProperty : string, updatedValue: string | number ) => void
}

export default function AddBookPage({fetchBooks, user, updateUser}: Readonly<FetchProps>) {
    const [book, setBook] = useState<BookWithoutId>({
        title: "",
        author: "",
        description: "",
        genre: "NONE",
        isbn: "",
        cover: "https://inspektorat.cianjurkab.go.id/images/publikasi/Default-book-cover.png",
        rating: 0,
        publicationDate: "",
        readingStatus: "TO_BE_READ"
    });
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post("/api/books", book)
            .then(response => console.log(response))
            .then(() => fetchBooks())
            .catch(error => console.log(error))

        if (book.readingStatus === "READ") {
            updateUser("readBooks", (user.readBooks + 1))
        }

        navigate("/books")
    }

    return (
        <>
            <h2>Add a Book</h2>
            <BookForm book={book} setBook={setBook} handleSubmit={handleSubmit} action={"Add"} editable={true}/>
        </>
    )
}