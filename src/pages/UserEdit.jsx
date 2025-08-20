// src/pages/UserEdit.jsx

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export const UserEdit = () => {
    const { id } = useParams()
    const [user, setUser] = useState({});
    console.log(id)


    const getUserById = async () => {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8000/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        setUser(response.data.data);
    }

    useEffect(() => {
        getUserById();
    }, []);

    return (
        <div>
            <h1>User Edit Page</h1>
            <p>This is the user edit page for user with ID: {id.id}</p>
            <p>Here you can edit user details.</p>
            <div>
                <form >
                    <input type="text" name="first_name" placeholder="First Name" defaultValue={user.first_name} />
                    <input type="text" name="last_name" placeholder="Last Name" defaultValue={user.last_name} />
                    <input type="email" name="email" placeholder="Email" defaultValue={user.email} />
                    <input type="date" name="birth_date" defaultValue={new Date(user.birth_date).toISOString().split('T')[0]} />
                    
                    <button type="submit">Update User</button>
                </form>
            </div>
        </div>
    );
}