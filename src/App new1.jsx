// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./pages/Header";
import { LandingPage } from "./pages/LandingPage";
import { MenuSection } from "./pages/MenuSection";

export const App = () => {
  return (
    <BrowserRouter>
      {/* Header fijo arriba */}
      <Header />

      {/* Contenido scrollable debajo del header (h-24 = 6rem) */}
      <main className="fixed inset-x-0 top-24 bottom-0 overflow-y-auto overflow-x-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/menu" element={<MenuSection />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}
