import "./BookDetailsPage.css";
import {Book} from "../../../types/types.ts";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

export default function BookDetailsPage() {
    const [book, setBook] = useState<Book>({title: "", author: "", id: ""})
    const params = useParams();
    const id: string | undefined = params.id;

    const fetchBook = () => {
        axios.get(`/api/books/${id}`)
            .then((response)=> setBook(response.data))
            .catch((error) => console.log(error.response.data))
    }

    useEffect(()=>{
        fetchBook();
    },[])

    return (
        <>
            <article>
                <h3>Title: {book.title}</h3>
                <p>Author: {book.author}</p>
                <p>More details...</p>
                <Link to={"/"}>Back</Link>
            </article>
        </>
    )
    }