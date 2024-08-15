import {ChangeEvent, FormEvent, useState} from "react";
import {NewBook} from "../../../../types/types.ts";

export default function AddBookForm() {

    const [book, setBook] = useState<NewBook>({title: "", author: "", genre: "", publicationDate: ""});

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        setBook({...book, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(event);
        console.log(book);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Add a new book here</label>
            <input
                type={"text"}
                name={"title"}
                value={book.title}
                onChange={handleChange}
            />
            <input
                type={"text"}
                name={"author"}
                value={book.author}
                onChange={handleChange}
            />
            <input
                type={"text"}
                name={"genre"}
                value={book.genre}
                onChange={handleChange}
            />
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