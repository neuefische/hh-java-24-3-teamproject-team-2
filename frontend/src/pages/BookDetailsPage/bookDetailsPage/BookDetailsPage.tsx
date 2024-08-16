import "./BookDetailsPage.css";
import {Book} from "../../../types/types.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import EditForm from "../../../components/editForm/EditForm.tsx";
import ConfirmationModal from "../../../components/confirmationModal/ConfirmationModal.tsx";


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

    const [showPopup, setShowPopup] = useState<boolean>(false);

    const params = useParams();
    console.log(params);
    const navigate = useNavigate();
    const id: string | undefined = params.id;

    const fetchBook = () => {
        axios.get(`/api/books/${id}`)
            .then((response) => setBook(response.data))
            .catch((error) => console.log(error.response.data))
    }

    const handleDelete = () => {
       setShowPopup(true);
    }

    const handleClose = () => {
        setShowPopup(false)
    }

    const handleDeleteConfirm = (id: string) => {
        deleteBook(id);
        navigate("/books");
        setShowPopup(false);
    }

    useEffect(() => {
        fetchBook();
    }, [])

    return (
        <>
            <article>
                <h3>Title: {book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Description: {book.description}</p>
                <p>Genre: {book.genre} </p>
                <p>ISBN: {book.isbn}</p>
                <img width={200} alt={`cover form book ${book.title}`} src={book.cover}/>
                <p>Publication Date: {book.publicationDate}</p>
                <Link to={"/"}>Back</Link>
                <button onClick={() => {
                    handleDelete()
                }}>Delete
                </button>
            </article>
            {showPopup && <ConfirmationModal handleClose={handleClose} handleDeleteConfirm={handleDeleteConfirm} itemIdToBeDeleted={book.id}/>}
            <EditForm book={book}/>
        </>
    )
}