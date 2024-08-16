import "./ConfirmationModal.css";
import DeleteIcon from "../../assets/delete-svgrepo-com.svg";

type ModalProps = {
    handleClose: () => void,
    handleDeleteConfirm: (id: string) => void,
    itemIdToBeDeleted: string
}

export default function ConfirmationModal ({handleClose, handleDeleteConfirm, itemIdToBeDeleted}: ModalProps) {

    return (
        <div className={"modal-backdrop"}>
            <div className={"modal"}>
                <div className={"modal-body"}>
                    <img className={"delete-icon"} src={DeleteIcon} alt="delete icon"/>
                    <h2 className={"modal-body-title"}>Delete Book</h2>
                    <h4 className={"modal-body-message"}>Are you sure you want to delete this book?</h4>
                </div>
                <div className={"modal-buttons"}>
                    <button className={"close-btn"} onClick={handleClose}>Close</button>
                    <button className={"delete-btn"} onClick={() => handleDeleteConfirm(itemIdToBeDeleted)}>Delete</button>
                </div>
            </div>
        </div>
    )
}