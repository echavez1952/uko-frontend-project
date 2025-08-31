// src/components/Header.jsx
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_uko.png";

export const Header = () => {
  const navigate = useNavigate();

  return (
    // <header className="w-full bg-white shadow-lg fixed top-0 left-0 z-50"> 
    <header className="w-full bg-white shadow-lg fixed top-0 left-0 z-50"> 
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-4 py-2 gap-4">
        {/* Logo + Título */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="UKÖ Bread" className="h-20" />
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
          <span className="cursor-pointer hover:text-amber-600 transition">
            Locales
          </span>
        </nav>

        {/* Botón Login */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition text-base font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 2a5 5 0 0 0-5 5v1a5 5 0 1 0 10 0V7a5 5 0 0 0-5-5Zm-7 18a7 7 0 0 1 14 0H5Z"
              clipRule="evenodd"
            />
          </svg>
          UKÖ Login
        </button>
      </div>
    </header>
  );
};

