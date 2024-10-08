import React, { useState, useEffect } from "react";
import './modal.css'; 
import axios from "axios";

const EditUserModal = ({ user, onClose, setUsers }) => {
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        street: user?.address?.street || "",
        city: user?.address?.city || "",
        company: user?.company?.name || "",
        username: user?.username || "",
        website: user?.website || ""
    });

    useEffect(() => {
        if (formData.name) {
            setFormData(prev => ({ ...prev, username: `USER-${formData.name}` }));
        }
    }, [formData.name]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCloseAndUpdate = async (e) => {
        e.preventDefault();
        if (user?.id) {
            // Editing an existing user
            try {
                const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
                    ...formData,
                    address: { street: formData.street, city: formData.city },
                    company: { name: formData.company }
                });

                setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? response.data : u));
                alert("User updated successfully!"); // Provide feedback to the user
            } catch (error) {
                console.error("Error updating user:", error.response || error);
                alert("Failed to update user. Please try again.");
            }
        } else {
            // Adding a new user
            try {
                const response = await axios.post(`https://jsonplaceholder.typicode.com/users`, {
                    ...formData,
                    address: { street: formData.street, city: formData.city },
                    company: { name: formData.company }
                });

                setUsers(prevUsers => [...prevUsers, response.data]);
                alert("User added successfully!"); // Provide feedback to the user
            } catch (error) {
                console.error("Error adding user:", error.response || error);
                alert("Failed to add user. Please try again.");
            }
        }
        onClose(); // Close the modal after updating or adding
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{user?.id ? "Edit User" : "Add New User"}</h2>
                <form onSubmit={handleCloseAndUpdate}>
                    {/* Input fields remain unchanged */}
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="street"
                            placeholder="Street"
                            value={formData.street}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="company"
                            placeholder="Company (Optional)"
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            readOnly
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="website"
                            placeholder="Website (Optional)"
                            value={formData.website}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
