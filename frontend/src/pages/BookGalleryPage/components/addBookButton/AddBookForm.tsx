import {ChangeEvent, FormEvent, useState} from "react";
import {Genre, NewBook} from "../../../../types/types.ts";
import axios from "axios";

export default function AddBookForm() {

    const [book, setBook] = useState<NewBook>({title: "", author: "", genre: "", publicationDate: ""});

    const genres: Genre = {
        NONE: "None",
        FICTION: "Fiction",
        MYSTERY: "Mystery",
        THRILLER: "Thriller",
        FANTASY: "Fantasy",
        SCIENCE: "Science",
        NON_FICTION: "Non fiction",
        HISTORY: "History",
        NOVEL: "Novel"
    }

    function handleChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void {
        setBook({...book, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(book);
        console.log(event);

        axios.post("/api/books", {
            title: book.title,
            author: book.author,
            genre: Object.keys(genres).find(
                key => genres[key as keyof typeof genres] === book.genre),
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
                required={true}
            />
            <label>Author</label>
            <input
                type={"text"}
                name={"author"}
                value={book.author}
                onChange={handleChange}
                required={true}
            />
            <label>Genre</label>
            <select required={true} value={book.genre} onChange={handleChange} name={"genre"}>
                {Object.values(genres).map((genre, index) => (
                    <option key={index} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>
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