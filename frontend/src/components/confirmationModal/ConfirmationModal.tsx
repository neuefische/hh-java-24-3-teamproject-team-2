type ModalProps = {
    handleClose: () => void
}

export default function ConfirmationModal ({handleClose}: ModalProps) {

    return (
            <div className="modal">
                <div className="modal-body">
                    <p>This is a modal component.</p>
                </div>
                <button className="close-btn" onClick={handleClose}>Close</button>
            </div>
    )
}