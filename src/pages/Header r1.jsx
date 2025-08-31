// src/components/Header.jsx
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_uko.png";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <img src={logo} alt="UKÖ Bread" className="h-14" />

        {/* Navegación */}
        <nav>
          <ul className="flex gap-8 text-gray-700 font-medium">
            <li
              onClick={() => navigate("/menu")}
              className="cursor-pointer hover:text-amber-600 transition"
            >
              Menú
            </li>
            <li className="cursor-pointer hover:text-amber-600 transition">
              Locales
            </li>
          </ul>
        </nav>

        {/* Botón Login */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
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
          <span className="font-semibold">UKÖ Login</span>
        </button>
      </div>
    </header>
  );
};
