import {ChangeEvent, FormEvent, useState} from "react";
import {NewBook} from "../../../../types/types.ts";
import axios from "axios";

export default function AddBookForm() {

    const [book, setBook] = useState<NewBook>({title: "", author: "", genre: "", publicationDate: ""});

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        setBook({...book, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(book);
        axios.post("/api/books", {
            title: book.title,
            author: book.author,
            genre: book.genre,
            publicationDate: book.publicationDate
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))

    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
                type={"text"}
                name={"title"}
                value={book.title}
                onChange={handleChange}
            />
            <label>Author</label>
            <input
                type={"text"}
                name={"author"}
                value={book.author}
                onChange={handleChange}
            />
            <label>Genre</label>
            <input
                type={"text"}
                name={"genre"}
                value={book.genre}
                onChange={handleChange}
            />
            <label>Publication Date</label>
            <input
                type={"date"}
                name={"publicationDate"}
                value={book.publicationDate}
                onChange={handleChange}
            />
            <button>Create</button>
        </form>
    )
}