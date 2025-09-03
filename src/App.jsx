// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./pages/Header";
import { Login } from "./pages/Login";
import { LandingPage } from "./pages/LandingPage";
import { MenuSection } from "./pages/MenuSection";

// import { ComponentProducts } from "./pages/ComponentProducts";
// import { MenuComponentForm } from './components/MenuComponentForm.jsx';
// import { MenuComponentList } from './components/MenuComponentList.jsx';
// import { ProductsList } from "./components/ProductsList.jsx";
// import { ItemsList } from "./components/ItemsList.jsx";
// import { ItemEdit } from "./components/ItemEdit.jsx";
// import { ItemCreateForm } from "./components/ItemCreateForm.jsx";
// import { ProductCreateForm } from "./components/ProductCreateForm.jsx";
// import { MenuBase } from "./components/MenuBase.jsx";
// import { ComponentEdit } from "./components/ComponentEdit.jsx";
import { LocationsForm } from "./components/LocationsForm.jsx";
import { ListUkoLocals } from "./components/ListLUkoLocals.jsx";


export const App = () => {
  return (
    <BrowserRouter>
      {/* Header fijo arriba */}
      {/* <Header /> */}

      {/* Contenido scrollable debajo del header (h-24 = 6rem) */}
      {/* <main className="fixed inset-x-0 top-24 bottom-0 overflow-y-auto overflow-x-hidden bg-gray-50"> */}
        {/* <div className="max-w-7xl mx-auto px-4 py-6"> */}
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            {/* <Route path="/menu" element={<MenuSection />} /> */}
            <Route path="/" element={<MenuSection />} />
            {/* <Route path="/login" element={<Login />} /> */}
          
            
            {/* <Route path="/create-location" element={<LocationsForm />} />
            <Route path="/list-locals" element={<ListUkoLocals />} /> */}
          
          
          
          
          </Routes>
        {/* </div> */}
      {/* </main> */}
    </BrowserRouter>
  );
}
