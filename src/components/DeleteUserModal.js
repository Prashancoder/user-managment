import React from "react";

const DeleteUserModal = ({ user, onClose, handleDelete }) => {
    const handleConfirmDelete = () => {
        handleDelete(user.id); // Call the delete function
        onClose(); // Close the modal after deletion
    };

    return (
        <div className="modal">
            <h2>Are you sure you want to delete {user.name}?</h2>
            <button onClick={handleConfirmDelete}>Yes, Delete</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default DeleteUserModal;
