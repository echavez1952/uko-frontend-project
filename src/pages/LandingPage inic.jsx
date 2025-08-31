// src/pages/LandingPage.jsx

import background from "../assets/image-background2.jpg"; // Usa una imagen e tu marca

export const LandingPage = () => {
  return (
    <section
      className="w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-green-950 bg-opacity-50 p-8 rounded-xl text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Bienvenido a <span className="text-white">UKÖ Bread</span>
        </h1>
        <p className="text-lg md:text-xl font-bold">
          La magia de la fermentación natural
        </p>
      </div>
    </section>
  );
};
