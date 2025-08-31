// src/App.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./pages/Header";
import { Login } from "./pages/Login";
import { MenuSection } from "./pages/MenuSection";
import { ComponentProducts } from "./pages/ComponentProducts";
import { MenuComponentForm } from './components/MenuComponentForm.jsx';
import { MenuComponentList } from './components/MenuComponentList.jsx';
import { ProductsList } from "./components/ProductsList.jsx";
import { ItemsList } from "./components/ItemsList.jsx";
import { ItemEdit } from "./components/ItemEdit.jsx";
import { ItemCreateForm } from "./components/ItemCreateForm.jsx";
import { ProductCreateForm } from "./components/ProductCreateForm.jsx";
import { MenuBase } from "./components/MenuBase.jsx";
import { ComponentEdit } from "./components/ComponentEdit.jsx";
// import { LandingPage } from "./pages/LandingPage";



export const App = () => {
  return (
    <BrowserRouter>
      <Header />  
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<div className="p-6">Bienvenido a UKÖ</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<MenuSection />} />
        
        
      </Routes>
    </BrowserRouter>  
  );
};
