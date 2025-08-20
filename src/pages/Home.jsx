import {useEffect} from "react";
import axios from "axios";

export const Home = () => {
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        const response = axios.get('https://localhost:8080/products',{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        console.log(response)
    })
    
    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>
            <p>This is where you can find the latest updates and information.</p>
        </div>
    );
    
}