// src/pages/LandingPage.jsx

import background from "../assets/image-background2.jpg";

export const LandingPage = () => {
  return (
    <section className="relative w-full min-h-screen flex items-end justify-center bg-neutral-900 text-white">
      {/* Fondo */}
      <img
        src={background}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* Contenido anclado abajo */}
      <div className="relative z-10 w-full px-6 pb-20 md:pb-28">
       {/* Caja */}
        <div className="mx-auto max-w-2xl rounded-xl bg-green-900/85 p-8 text-center shadow-xl">
          {/* ↑ drop-shadow al texto para perfilar letras sobre la foto */}
          <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.85)] subpixel-antialiased">
            Bienvenido a <span className="text-white">UKÖ Bread</span>
          </h1>
          <p className="text-lg font-medium md:text-xl ">  
            La magia de la fermentación natural
          </p>
        </div>
      </div>
    </section>
  );
};
