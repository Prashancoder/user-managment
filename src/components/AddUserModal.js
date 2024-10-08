import React, { useState } from "react";
import './modal.css';

const AddUserModal = ({ onClose, onAddUser }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        company: "",
        username: ""
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name) {
            newErrors.name = "Name is required";
        } else if (formData.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters long";
        }

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailPattern.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        // Phone validation (assumed as 10-digit number)
        const phonePattern = /^\d{10}$/;
        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
        } else if (!phonePattern.test(formData.phone)) {
            newErrors.phone = "Invalid phone number";
        }

        // Street validation
        if (!formData.street) {
            newErrors.street = "Street is required";
        }

        // City validation
        if (!formData.city) {
            newErrors.city = "City is required";
        }

        // Company validation (optional but must be at least 3 characters if provided)
        if (formData.company && formData.company.length < 3) {
            newErrors.company = "Company name must be at least 3 characters long";
        }

        // Website validation (optional but must be a valid URL if provided)
        if (formData.website) {
            const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/.*)?$/;
            if (!urlPattern.test(formData.website)) {
                newErrors.website = "Invalid URL format";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Autofill username based on name
        if (name === "name") {
            setFormData({ ...formData, [name]: value, username: `USER-${value}` });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onAddUser(formData); // Send the form data back to UserList
            onClose(); // Close the modal after submitting
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add New User</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <p className="error">{errors.phone}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="street"
                            placeholder="Street"
                            value={formData.street}
                            onChange={handleChange}
                        />
                        {errors.street && <p className="error">{errors.street}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        {errors.city && <p className="error">{errors.city}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="company"
                            placeholder="Company (Optional)"
                            value={formData.company}
                            onChange={handleChange}
                        />
                        {errors.company && <p className="error">{errors.company}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            readOnly
                        />
                        {/* Username is autofilled and non-editable */}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="website"
                            placeholder="Website (Optional)"
                            value={formData.website}
                            onChange={handleChange}
                        />
                        {errors.website && <p className="error">{errors.website}</p>}
                    </div>

                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;

















