import "./BookDetailsPage.css";
import {Book} from "../../../types/types.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

type DeleteProps = {
    deleteBook: (id: string) => void;
}

export default function BookDetailsPage({deleteBook}: DeleteProps) {
    const [book, setBook] = useState<Book>({title: "", author: "", id: ""})
    const params = useParams();
    const navigate = useNavigate();
    const id: string | undefined = params.id;

    const fetchBook = () => {
        axios.get(`/api/books/${id}`)
            .then((response)=> setBook(response.data))
            .catch((error) => console.log(error.response.data))
    }

    const handleDelete = (id: string) => {
        deleteBook(id)
        navigate("/books")
    }

    useEffect(()=>{
        fetchBook();
    },[])

    return (
        <article>
            <h3>Title: {book.title}</h3>
            <p>Author: {book.author}</p>
            <p>More details...</p>
            <Link to={"/"}>Back</Link>
            <button onClick={() => {handleDelete(book.id)}}>Delete</button>
        </article>
    )
    }