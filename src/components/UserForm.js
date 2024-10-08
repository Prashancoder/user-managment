// UserForm.js
import React, { useState } from "react";

const UserForm = ({ onSubmit, user }) => {
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [address, setAddress] = useState(user?.address?.street || "");
    const [company, setCompany] = useState(user?.company?.name || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { 
            name, 
            email, 
            phone, 
            address: { street: address }, 
            company: { name: company } 
        };
        onSubmit(userData); // Call onSubmit to either add or update
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required minLength={3} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Phone:</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div>
                <label>Address:</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div>
                <label>Company:</label>
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;
