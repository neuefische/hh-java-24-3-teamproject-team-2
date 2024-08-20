import {FormEvent, useState} from "react";
import {BookWithoutId} from "../../../../types/types.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./AddBookForm.css";
import BookForm from "../../../../components/bookForm/BookForm.tsx";

type FetchProps = {
    fetchBooks: () => void;
}

export default function AddBookForm({fetchBooks}: Readonly<FetchProps>) {
    const [book, setBook] = useState<BookWithoutId>({
        title: "",
        author: "",
        description: "",
        genre: "",
        isbn: "",
        cover: "",
        rating: 0,
        publicationDate: ""
    });
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios.post("/api/books", {book})
            .then(() => fetchBooks())
            .then(response => console.log(response))
            .catch(error => console.log(error))

        navigate("/books")
    }

    return (
        <>
            <h2>Add a Book</h2>
            <BookForm book={book} setBook={setBook} handleSubmit={handleSubmit} action={"Add"} editable={true}/>
        </>
    )
}