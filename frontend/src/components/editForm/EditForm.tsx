import './EditForm.css'
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {Book} from "../../types/types.ts";

type FormData = {
    book: Book
}

export default function EditForm({book}: FormData) {

    const [formData, setFormData] = useState<Book>(book);

    useEffect(() => {
        setFormData(book);
    }, [book]);

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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

    function onCancel() {
        console.log("cancel")
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Title:
                <input
                    placeholder={book.title}
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </label>
            <label>Author:
                <input
                    placeholder={book.author}
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                />
            </label>
            <label>Description: </label>
            <textarea rows={5} cols={30}
                      placeholder={book.description}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
            />
            <label>Genre:
                <input
                    placeholder={book.genre}
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                />
            </label>
            <label>ISBN:
                <input
                    placeholder={book.isbn}
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                />
            </label>
            <label>Cover:
                <input
                    placeholder={book.cover}
                    type="text"
                    name="cover"
                    value={formData.cover}
                    onChange={handleChange}
                />
            </label>
            <label>Publication Date: </label>
            <input
                placeholder={book.publicationDate}
                type={"date"}
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleChange}
            />
            <div>
                <button type={"submit"}>Submit</button>
                <button onClick={onCancel} type={"button"}>Cancel</button>
            </div>
        </form>

    )
}

