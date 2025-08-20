// src/pages/Register.jsx

import './Register.css'
import axios  from "axios";

export const Register = () => {
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        const response = await axios.post('http://localhost:8000/auth/register', data)
        alert(response.data.message);

    }
    
    return (
        <div>
            <h1>Register Page</h1>
            <p>This is the registration page.</p>
            <p>Please fill out the form to create a new account.</p>
            
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" name="first_name" placeholder="First Name"  />
                <input type="text" name="last_name" placeholder="Last Name" />
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password"/>
                <input type="date" name="birth_date" />
                
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}