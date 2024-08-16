import "./ConfirmationModal.css";
import DeleteIcon from "../../assets/delete-svgrepo-com.svg";
import {Book} from "../../types/types.ts";

type ModalProps = {
    handleClose: () => void,
    handleDeleteConfirm: (id: string) => void,
    bookToBeDeleted: Book
}

export default function ConfirmationModal ({handleClose, handleDeleteConfirm, bookToBeDeleted}: ModalProps) {

    return (
        <div className={"modal-backdrop"}>
            <div className={"modal"}>
                <div className={"modal-body"}>
                    <img className={"delete-icon"} src={DeleteIcon} alt="delete icon"/>
                    <h2 className={"modal-body-title"}>Delete Book</h2>
                    <h4 className={"modal-body-message"}>Are you sure you want to delete <em style={{color: "blue"}}>{bookToBeDeleted.title}</em>?</h4>
                </div>
                <div className={"modal-buttons"}>
                    <button className={"close-btn"} onClick={handleClose}>No, cancel</button>
                    <button className={"delete-btn"} onClick={() => handleDeleteConfirm(bookToBeDeleted.id)}>Yes, delete!</button>
                </div>
            </div>
        </div>
    )
}