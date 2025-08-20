import { useNavigate } from "react-router-dom";

export const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" // Cambia por tu logo
              alt="UKÖ Logo"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-gray-800">UKÖ Bread</span>
          </div>

          {/* Navegación */}
          <nav className="hidden md:flex gap-6">
            <button className="text-gray-700 hover:text-blue-600 font-medium">
              Menú
            </button>
            <button className="text-gray-700 hover:text-blue-600 font-medium">
              Locales
            </button>
          </nav>

          {/* Botón Login */}
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            UKÖ Login
          </button>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="flex-grow">{children}</main>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Información de contacto */}
          <div>
            <p>📍 Dirección: Av. Panificadora #123, Ciudad</p>
            <p>📞 Teléfono: +593 999 999 999</p>
          </div>

          {/* Redes sociales */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400" aria-label="Facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H8v-2.88h2.5V9.41c0-2.47 1.47-3.83 3.73-3.83 1.08 0 2.21.19 2.21.19v2.43H15.5c-1.37 0-1.8.85-1.8 1.72v2.07h3.06l-.49 2.88h-2.57v6.99A10 10 0 0 0 22 12Z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-400" aria-label="Instagram">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
