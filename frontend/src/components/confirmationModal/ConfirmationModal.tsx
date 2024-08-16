
type ModalProps = {
    handleClose: () => void,
    handleDeleteConfirm: (id: string) => void,
    itemIdToBeDeleted: string
}

export default function ConfirmationModal ({handleClose, handleDeleteConfirm, itemIdToBeDeleted}: ModalProps) {

    return (
        <div className="modal">
            <div className="modal-body">
                <p>This is a modal component.</p>
            </div>
            <button className="delete-btn" onClick={() => handleDeleteConfirm(itemIdToBeDeleted)}>Delete</button>
            <button className="close-btn" onClick={handleClose}>Close</button>
        </div>
    )
}