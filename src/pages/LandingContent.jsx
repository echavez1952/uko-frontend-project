export const LandingContent = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Imagen de fondo */}
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Capa oscura para contraste */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Bienvenido a UKÖ Bread
        </h1>
        <p className="text-lg md:text-2xl font-semibold mb-6">
          La magia de la fermentación natural
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition">
          Empezar ahora
        </button>
      </div>
    </div>
  );
};
