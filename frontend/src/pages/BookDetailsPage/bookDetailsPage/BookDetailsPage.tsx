import "./BookDetailsPage.css";
import {Book} from "../../../types/types.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import EditForm from "../../../components/editForm/EditForm.tsx";


type DeleteProps = {
    deleteBook: (id: string) => void;
}

export default function BookDetailsPage({deleteBook}: DeleteProps) {
    const [book, setBook] = useState<Book>({
        title: "",
        author: "",
        id: "",
        description: "",
        genre: "",
        isbn: "",
        cover: "",
        publicationDate: ""
    })
    const params = useParams();
    const navigate = useNavigate();
    const id: string | undefined = params.id;

    const fetchBook = () => {
        axios.get(`/api/books/${id}`)
            .then((response) => setBook(response.data))
            .catch((error) => console.log(error.response.data))
    }

    const handleDelete = (id: string) => {
        deleteBook(id)
        navigate("/books")
    }

    useEffect(() => {
        fetchBook();
    }, [])

    return (
        <>
            <article className={"book-details"}>
                <Link className={"book-button align-left"} to={"/books"}>Back</Link>
                <h3>{book.title}</h3>
                <img className={"big-cover"} src={book.cover} alt={`${book.title} Book Cover`}/>
                <div className={"book-details-info"}>
                    <p><span className={"book-label"}>Title:</span> {book.title}</p>
                    <p><span className={"book-label"}>Author:</span> {book.author}</p>
                    <p><span className={"book-label"}>Description:</span> {book.description}</p>
                    <p><span className={"book-label"}>Genre:</span> {book.genre} </p>
                    <p><span className={"book-label"}>ISBN:</span> {book.isbn}</p>
                    <p><span className={"book-label"}>Publication Date:</span> {book.publicationDate}</p>
                </div>

                <button onClick={() => {
                    handleDelete(book.id)
                }}>Delete
                </button>
            </article>
            <EditForm book={book}/>
        </>

    )
}