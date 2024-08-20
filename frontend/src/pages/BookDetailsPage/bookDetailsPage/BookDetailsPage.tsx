import "./BookDetailsPage.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {FormEvent, useEffect, useState} from "react";
import BookForm from "../../../components/bookForm/BookForm.tsx";
import ConfirmationModal from "../../../components/confirmationModal/ConfirmationModal.tsx";
import {BookWithoutId} from "../../../types/types.ts";
import StarRating from "../../../components/starRating/StarRating.tsx";


type DeleteProps = {
    deleteBook: (id: string) => void;
}

export default function BookDetailsPage({deleteBook}: Readonly<DeleteProps>) {
    const [book, setBook] = useState<BookWithoutId>({
        title: "",
        author: "",
        description: "",
        genre: "",
        isbn: "",
        cover: "",
        rating: 0,
        publicationDate: ""
    })
    const [editable, setEditable ] = useState<boolean>(false);
    const [ratingValue, setRatingValue] = useState<number | null>(0);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const params = useParams();
    const navigate = useNavigate();
    const id: string | undefined = params.id;

    const fetchBook = () => {
        axios.get(`/api/books/${id}`)
            .then((response) => {
                setBook(response.data)
                setRatingValue(response.data.rating)}
            )
            .catch((error) => console.log(error.response.data))

    }
    useEffect(() => {
        fetchBook();
    }, [])

    const handleDelete = () => {
       setShowDeleteModal(true);
    }

    const handleClose = () => {
        setShowDeleteModal(false)
    }

    const handleDeleteConfirm = () => {
        if (id) {
            deleteBook(id);
            navigate("/books");
            setShowDeleteModal(false);
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(ratingValue) {
            book.rating = ratingValue
        }
        axios.put(`/api/books/${id}/update`, book)
            .then(()=>setEditable(false))
            .catch((error) => console.log(error.response.data))
    }

    const onEdit = () => {
        setEditable(!editable)
        if (editable) {
            fetchBook()
        }
    }


    return (
        <article className={"book-details"}>
            <div id={"top-buttons"}>
                <Link className={"book-button align-left"} to={"/books"}>Back</Link>
                <button className={"align-right"} onClick={onEdit}>{editable ? "Cancel Edit" : "Edit"}</button>
            </div>
            <h2>{book.title}</h2>
            <img className={"big-cover"} src={book.cover} alt={`${book.title} Book Cover`}/>
            <StarRating  size={"large"} ratingValue={ratingValue} setRatingValue={setRatingValue} editable={editable}/>
            <BookForm book={book} setBook={setBook} handleSubmit={handleSubmit} action={"Update"} editable={editable}/>
            <button className={"stretch"} onClick={handleDelete}>Delete
            </button>
            {showDeleteModal && <ConfirmationModal handleClose={handleClose} handleDeleteConfirm={handleDeleteConfirm} bookToBeDeleted={book}/>}
        </article>
    )
}