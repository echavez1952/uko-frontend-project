// src/pages/Header.jsx

import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo_uko.png";

const IconUser = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    {/* círculo cabeza + base cuerpo */}
    <path
      fillRule="evenodd"
      d="M12 2a5 5 0 0 0-5 5v1a5 5 0 1 0 10 0V7a5 5 0 0 0-5-5Zm-7 18a7 7 0 0 1 14 0H5Z"
      clipRule="evenodd"
    />
  </svg>
);

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full bg-white shadow">
      {/* fila interna compacta (80px alto). Si prefieres 64px: cambia h-[80px] → h-[64px] y ajusta App.jsx */}
      <div className="max-w-7xl mx-auto h-[64px] px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Branding */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-3 min-w-0"
          title="Inicio"
        >
          <img src={logo} alt="UKÖ Bread" className="h-14 w-auto" />
          <span className="text-lg sm:text-xl font-bold text-green-800 whitespace-nowrap">
            UKÖ Bread
          </span>
        </button>

        {/* Navegación */}
        {/* <nav className="flex items-center gap-4 sm:gap-8 text-sm sm:text-base text-gree-700 font-medium">
          <button
            onClick={() => navigate("/menu")}
            className="bg-green-700 items-center gap-2 hover:text-amber-600"
          >
            <span className="whitespace-nowrap">Menú</span>
          </button>
          <button
            onClick={() => navigate("/list-locals")}
            className=" bg-green-700 inline-flex items-center gap-2 hover:text-amber-600"
          >
            <span className="whitespace-nowrap">Locales</span>
          </button>
        </nav> */}

        {/* <nav style={{ display: "flex", gap: "1.5rem" }}> */}
        <nav className="flex items-center gap-4 text-lg text-green-700 font-medium">
          <Link to="/menu">Menu</Link>
          <Link to="/list-locals">Locals</Link>
        </nav>

        {/* Acción derecha (Login) */}
        <button
          onClick={() => navigate("/login")}
          className="inline-flex items-center gap-2 text-white bg-green-700 px-4 py-2 rounded-full hover:bg-green-800 font-semibold text-sm sm:text-base whitespace-nowrap"
        >
          <IconUser />
          UKÖ Login
        </button>
      </div>
    </header>
  );
};
