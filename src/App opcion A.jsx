// src/App.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./pages/Header";
import { LandingPage } from "./pages/LandingPage";
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
import { LocationsForm } from "./components/LocationsForm.jsx";
import { ListUkoLocals } from "./components/ListLUkoLocals.jsx";
import { ProbeTailwind } from "./ProbeTailwind.jsx";


export const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 h-[calc(100vh-6rem)] overflow-y-auto">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/menu" element={<MenuSection />} />
            <Route path="/login" element={<Login />} />

            <Route path="/prueba-tailwind" element={<ProbeTailwind />} />
            <Route path="/component-base" element={<MenuBase />} />
            <Route path="/component-create" element={<MenuComponentForm />} />
            <Route path="/component-edit/:compId/:compName" element={<ComponentEdit />} />
            <Route path="/component-list" element={<MenuComponentList />} />
            <Route path="/component/:id" element={<ComponentProducts />} />
            <Route path="/products-list/:component_id/:compName" element={<ProductsList />} />
            <Route path="/list-items/:productId/:prodTitle" element={<ItemsList />} />
            <Route path="/edit-item/:itemId" element={<ItemEdit />} />
            <Route path="/create-item/:productId/:prodTitle" element={<ItemCreateForm />} />
            <Route path="/product-create/:component_id/:compName" element={<ProductCreateForm />} />
            <Route path="/create-location" element={<LocationsForm />} />
            <Route path="/list-locals" element={<ListUkoLocals />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
