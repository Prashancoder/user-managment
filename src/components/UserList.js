import React, { useEffect, useState } from "react";
import axios from "axios";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import AddUserModal from "./AddUserModal"; // Import the AddUserModal component

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);
    const [showAddUserModal, setShowAddUserModal] = useState(false); // State to control modal visibility
    const [searchQuery, setSearchQuery] = useState(""); // State for the search query

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== id)); // Remove user from state
            })
            .catch(error => console.error("Error deleting user:", error));
    };

    const handleAddUser = (newUser) => {
        // Create the user object with separate address fields
        const userToAdd = {
            id: users.length + 1, 
            name: newUser.name, 
            email: newUser.email, 
            phone: newUser.phone,
            address: {
                street: newUser.street,  // Assuming newUser has street and city fields
                city: newUser.city,
                suite: newUser.suite,     // Include suite if applicable
                zipcode: newUser.zipcode   // Include zipcode if applicable
            },
            company: { name: newUser.company }    
        };
        setUsers([...users, userToAdd]);
    };


    

    // Filter users based on the search query
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2>User Management</h2>
            
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
            />

            {/* Button to open Add New User modal */}
            <button onClick={() => setShowAddUserModal(true)}>Add New User</button>

            {/* Modal for adding a new user */}
            {showAddUserModal && (
                <AddUserModal onClose={() => setShowAddUserModal(false)} onAddUser={handleAddUser} />
            )}

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Company</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address.street}, {user.address.city}, {user.address.suite}, {user.address.zipcode}</td>
                            <td>{user.company.name}</td>
                            <td>
                                <button onClick={() => setEditUser(user)}>Edit</button>
                                <button onClick={() => setDeleteUser(user)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editUser && (
                <EditUserModal user={editUser} onClose={() => setEditUser(null)} setUsers={setUsers} />
            )}

            {deleteUser && (
                <DeleteUserModal user={deleteUser} onClose={() => setDeleteUser(null)} handleDelete={handleDelete} />
            )}
        </div>
    );
};

export default UserList;

