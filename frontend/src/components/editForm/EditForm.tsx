import './EditForm.css'
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {Book, Genre} from "../../types/types.ts";

type FormData = {
    book: Book
}

const genres: Genre = {
    NONE: "None",
    FICTION: "Fiction",
    MYSTERY: "Mystery",
    THRILLER: "Thriller",
    FANTASY: "Fantasy",
    SCIENCE: "Science",
    NON_FICTION: "Non-fiction",
    HISTORY: "History",
    NOVEL: "Novel",
    HISTORICAL_FICTION: "Historical fiction",
    SCIENCE_FICTION: "Science fiction",
    ROMANCE: "Romance",
    YOUNG_ADULT: "Young adult",
    ADVENTURE: "Adventure",
    HORROR: "Horror"
}

export default function EditForm({book}: Readonly<FormData>) {

    const [formData, setFormData] = useState<Book>(book);

    useEffect(() => {
        setFormData(book);
    }, [book]);

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) {
        const {name, value} = event.target;
        setFormData({
            ...formData, [name]: value
        });
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const response = await axios.put(`/api/books/${book.id}/update`, formData);
            console.log('Update successful:', response.data);
        } catch (error) {
            console.error('Update failed:', error);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor={"title"} className={"book-label align-right"}>Title</label>
            <input
                    placeholder={book.title}
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            <label htmlFor={"author"} className={"book-label align-right"}>Author</label>
            <input
                    placeholder={book.author}
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                />
            <label htmlFor={"description"} className={"book-label align-right"}>Description</label>
            <textarea rows={5} cols={30}
                          placeholder={book.description}
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                />
            <label htmlFor={"genre"} className={"book-label align-right"}>Genre</label>
            <select required={true} value={formData.genre} onChange={handleChange} name={"genre"}>
                    {Object.values(genres).map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            <label htmlFor={"isbn"} className={"book-label align-right"}>ISBN</label>
            <input
                    placeholder={book.isbn}
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                />
            <label htmlFor={"cover"} className={"book-label align-right"}>Cover</label>
            <input
                    placeholder={book.cover}
                    type="text"
                    name="cover"
                    value={formData.cover}
                    onChange={handleChange}
                />
            <label htmlFor={"date"} className={"book-label align-right"}>Publication Date</label>
            <input
                placeholder={book.publicationDate}
                type={"date"}
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleChange}
            />
            <div>
                <button type={"submit"}>Submit</button>
            </div>
        </form>

    )
}

