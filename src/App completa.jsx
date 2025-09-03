// App.jsx
// App.jsx (scroll conjunto; sin fixed ni inset)

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
      {/* flex-col para que Header (shrink-0) y el contenido se apilen */}
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        {/* Contenido normal; NADA fixed aquí */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <Routes>
              {/* <Route path="/" element={<LandingPage />} /> */}
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
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};
