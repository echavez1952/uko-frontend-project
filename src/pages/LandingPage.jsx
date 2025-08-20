// src/pages/landingPage.jsx

import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Botón de login arriba derecha */}
      <button
        onClick={() => navigate("/login")}
        className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full shadow hover:bg-black/80 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 2a5 5 0 0 0-5 5v1a5 5 0 1 0 10 0V7a5 5 0 0 0-5-5Zm-7 18a7 7 0 0 1 14 0H5Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-white font-semibold">UKÖ Login</span>
      </button>

      {/* Contenido centrado */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
        <div>
          <h1 className="text-5xl font-bold mb-4">Bienvenido a UKÖ Bread</h1>
          <p className="text-lg font-semibold mb-6">
            La magia de la fermentación natural
          </p>
          <button
            onClick={() => navigate("/list-products")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition"
          >
            Empezar ahora
          </button>
        </div>
      </div>
    </div>
  );
};


// import { useNavigate } from "react-router-dom";

// export const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative w-full h-screen">
//       {/* Imagen de fondo */}
//       <img
//         src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
//         alt="Fondo"
//         className="absolute inset-0 w-full h-full object-cover"
//       />

//       {/* Botón de login arriba derecha */}
//       <button
//         onClick={() => navigate("/login")}
//         className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full shadow hover:bg-black/80 transition"
//       >
//         {/* Ícono usuario */}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 text-white"
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             fillRule="evenodd"
//             d="M12 2a5 5 0 0 0-5 5v1a5 5 0 1 0 10 0V7a5 5 0 0 0-5-5Zm-7 18a7 7 0 0 1 14 0H5Z"
//             clipRule="evenodd"
//           />
//         </svg>
//         <span className="text-white font-semibold">UKÖ Login</span>
//       </button>

//       {/* Contenido centrado */}
//       <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
//         <div>
//           <h1 className="text-5xl font-bold mb-4">Bienvenido a UKÖ Bread</h1>
//           <p className="text-lg font-semibold mb-6">La magia de la fermentación natural</p>
//           <button
//             className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition"
//           >
//             Empezar ahora
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
