// src/pages/Header.jsx

// Header fijo arriba
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_uko.png";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-24 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-full">
        {/* Logo + Título */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="UKÖ Bread" className="h-16" />
          <h1 className="text-3xl font-bold text-gray-800">UKÖ Bread</h1>
        </div>

        {/* Navegación */}
        <nav className="flex gap-10 text-lg text-gray-700 font-medium">
          <span
            onClick={() => navigate("/menu")}
            className="cursor-pointer hover:text-amber-600 transition"
          >
            Menú
          </span>

          <span
            onClick={() => navigate("/list-locals")}
            className="cursor-pointer hover:text-amber-600 transition"
          >
            Locales
          </span>
        </nav>


        {/* Login */}
        <button
          onClick={() => navigate("/login")}
          className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 font-semibold"
        >
          UKÖ Login
        </button>
      </div>
    </header>
  );
};
