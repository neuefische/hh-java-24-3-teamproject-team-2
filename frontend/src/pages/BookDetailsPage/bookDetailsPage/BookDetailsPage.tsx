import "./BookDetailsPage.css";
import {Book} from "../../../types/types.ts";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import EditForm from "../../../components/editForm/EditForm.tsx";

export default function BookDetailsPage() {
    const [book, setBook] = useState<Book>({
        title: "",
        author: "",
        id: "",
        description: "",
        genre: "",
        isbn: "",
        cover: ""
    })
    const params = useParams();
    const id: string | undefined = params.id;

    const fetchBook = () => {
        axios.get(`/api/books/${id}`)
            .then((response) => setBook(response.data))
            .catch((error) => console.log(error.response.data))
    }

    useEffect(() => {
        fetchBook();
    }, [])
    console.log(book)
    return (
        <>
            <article>
                <h3>Title: {book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Description: {book.description}</p>
                <p>Genre: {book.genre} </p>
                <p>ISBN: {book.isbn}</p>
                <img width={200} alt={`cover form book ${book.title}`} src={book.cover}/>
                <Link to={"/"}>Back</Link>
            </article>
            <EditForm
                id={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                genre={book.genre}
                isbn={book.isbn}
                cover={book.cover}
            />
        </>
    )
}