// src/pages/Users.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Users = () => {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUser()
  }, [])

  const getAllUser = async (role = null) => {
    let url = "http://localhost:8000/users";
    if (role && role !== 'all') {
      url += `?role=${role}`;
    }
    const token = localStorage.getItem('token');
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    setUsers(response.data.data);
    console.log(response.data.data)
  }

  const edit = async (id) => {
    navigate(`/user/${id}`); 
  }

  const remove = async (id) => {
    await axios.delete(`http://localhost:8000/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    getAllUser(); // Refresh the user list after deletion
    alert('User deleted successfully');
  }

  const filterUsers = async (e) => {
    e.preventDefault();
    const role = e.target.role.value;
    getAllUser(role)
  }

  return (
    <div>
      <h1>Users Page</h1>
      <p>This is the users page.</p>
      <p>Here you can view and manage users.</p>
      <div>
        <form onSubmit={(e) => filterUsers(e)}>
          <select name="role" id="role">
            <option value="all">All Users</option>
            <option value="admin">Admins</option>
            <option value="user">Users</option>
          </select>
          <button type="submit">Filter User</button>
        </form>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Birth Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>

            {
              users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.birth_date).toLocaleDateString()}</td>
                    <td><button onClick={() => edit(user._id)}>Editar</button></td>
                    <td><button onClick={() => remove(user._id)}>Eliminar</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}