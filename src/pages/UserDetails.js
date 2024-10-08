// import React, { useState, useEffect } from 'react';
// import { useParams, useHistory } from 'react-router-dom'; // Replaced useNavigate with useHistory

// const UserPage = () => {
//   const { id } = useParams();
//   const history = useHistory(); // Replaced useNavigate with useHistory
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
//       .then(response => response.json())
//       .then(data => setUser(data))
//       .catch(error => console.error('Error fetching user:', error));
//   }, [id]);

//   const deleteUser = () => {
//     fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
//       method: 'DELETE',
//     })
//       .then(() => {
//         alert('User deleted!');
//         history.push('/'); // Replaced navigate with history.push
//       })
//       .catch(error => console.error('Error deleting user:', error));
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>User Details</h2>
//       <p>Name: {user.name}</p>
//       <p>Email: {user.email}</p>
//       <p>Phone: {user.phone}</p>
//       <p>Address: {user.address.street}, {user.address.city}</p>
//       <button onClick={() => history.push('/')}>Back</button> {/* Replaced navigate with history.push */}
//       <button onClick={deleteUser}>Delete User</button>
//     </div>
//   );
// };

// export default UserPage;






























