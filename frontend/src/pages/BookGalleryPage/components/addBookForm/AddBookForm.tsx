import {ChangeEvent, FormEvent, useState} from "react";
import {Genre, NewBook} from "../../../../types/types.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./AddBookForm.css";

type FetchProps = {
    fetchBooks: () => void;
}

export default function AddBookForm({ fetchBooks }: FetchProps) {

    const [book, setBook] = useState<NewBook>({title: "", author: "", genre: "", publicationDate: ""});
    const navigate = useNavigate();

    const genres: Genre = {
        NONE: "None",
        FICTION: "Fiction",
        MYSTERY: "Mystery",
        THRILLER: "Thriller",
        FANTASY: "Fantasy",
        SCIENCE: "Science",
        NON_FICTION: "Non-fiction",
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
            .then(() => fetchBooks())
            .then(response => console.log(response))
            .catch(error => console.log(error))

        navigate("/books")
    }

    return (
        <>
            <h2>Add a Book</h2>
            <form onSubmit={handleSubmit} id={"addForm"}>
                <label className={"book-label align-right"} htmlFor={"title"}>Title</label>
                <input
                    type={"text"}
                    name={"title"}
                    value={book.title}
                    onChange={handleChange}
                    required={true}
                    placeholder={"Title"}
                />
                <label className={"book-label align-right"} htmlFor={"author"}>Author</label>
                <input
                    type={"text"}
                    name={"author"}
                    value={book.author}
                    onChange={handleChange}
                    required={true}
                    placeholder={"Author"}
                />
                <label className={"book-label align-right"} htmlFor={"genre"}>Genre</label>
                <select required={true} value={book.genre} onChange={handleChange} name={"genre"}>
                    {Object.values(genres).map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
                <label className={"book-label align-right"} htmlFor={"publicationDate"}>Publication Date</label>
                <input
                    type={"date"}
                    name={"publicationDate"}
                    value={book.publicationDate}
                    onChange={handleChange}
                />
                <button>Create</button>
            </form>
        </>

    )
}