// Header NO fijo (parte del flujo del documento)
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_uko.png";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full h-24 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-full">
        <div className="flex items-center gap-4">
          <img src={logo} alt="UKÖ Bread" className="h-16" />
          <h1 className="text-3xl font-bold text-gray-800">UKÖ Bread</h1>
        </div>
        <nav className="flex gap-10 text-lg text-gray-700 font-medium">
          <button onClick={() => navigate("/menu")} className="hover:text-amber-600">Menú</button>
          <button onClick={() => navigate("/list-locals")} className="hover:text-amber-600">Locales</button>
        </nav>
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
