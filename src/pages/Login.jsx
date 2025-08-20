// src/pages/Login.jsx

import './Login.css'
import axios from "axios";

export const Login = () => {
    
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        try {
            const response = await axios.post("http://localhost:8000/auth/login", {
            email,
            password,
        });
        
            if (response.status === 200) {
            console.log("Login successful", response);
            alert(response.data.message);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user_logged", JSON.stringify(response.data.user));
            window.location.href = "/";
            }
        } catch (error) {
            console.error("Login failed", error.response?.data || error.message);
            alert("❌ Error al iniciar sesión: " + (error.response?.data?.message || error.message));
        }
    };
        

    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800">Login Page</h1>
                <p className="text-center text-gray-600">Please enter your credentials to log in.</p>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                        Email
                        </label>
                        <input
                        type="email"
                        name="email"
                        placeholder="ejemplo@email.com"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                        Password
                        </label>
                        <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};
