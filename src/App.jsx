// src/App.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./pages/Header";
import { Login } from "./pages/Login";
import { MenuSection } from "./pages/MenuSection";
import { ComponentProducts } from "./pages/ComponentProducts";
import { MenuComponentList } from './components/MenuComponentList.jsx';
import { ProductsList } from "./components/ProductsList.jsx";
// import { LandingPage } from "./pages/LandingPage";



export const App = () => {
  return (
    <BrowserRouter>
      {/* <Header />  fijo arriba */}
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<div className="p-6">Bienvenido a UKÖ</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<MenuSection />} />
        <Route path="/component-list" element={<MenuComponentList />} />
        <Route path="/component/:id" element={<ComponentProducts />} />
        <Route path="/list-products/:componentId" element={<ProductsList />} />
      </Routes>
    </BrowserRouter>  
  );
};
