// src/pages/Header.jsx

// Header NO fijo (scroll conjunto)
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_uko.png";

export const Header = () => {
  const navigate = useNavigate();
  return (
    // Capa full-bleed que ocupa el viewport completo; evita encogerse
    <div className="w-screen bg-white shadow-md relative z-50">
      {/* Header con altura explícita y sin encogimiento */}
      <header className="max-w-7xl mx-auto h-24 px-6 flex items-center justify-between shrink-0">
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

        <button
          onClick={() => navigate("/login")}
          className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 font-semibold"
        >
          UKÖ Login
        </button>
      </header>
    </div>
  );
};
