
// src/App.jsx

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from './pages/Layout';
import { LandingContent } from "./pages/LandingContent";
import { Register } from "./pages/Register.jsx";
// import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Users } from "./pages/Users.jsx"
import { UserEdit } from './pages/UserEdit.jsx';
import { MenuComponentList } from './components/MenuComponentList.jsx';
import { MenuComponentForm } from './components/MenuComponentForm.jsx';
// import { MenuItemForm } from './components/MenuItemForm.jsx';
// import { EditMenuItemForm } from './components/EditMenuItemForm.jsx';
import { ProductsList } from './components/ProductsList.jsx';
import { ProductEdit } from './components/ProductEdit.jsx';
import { ProductCreateForm } from './components/ProductCreateForm.jsx';
import { LandingPage } from './pages/LandingPage';
import { MenuWithProducts } from './components/MenuWithProducts.jsx';


export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<Home/>}  /> */}
          <Route path="/" element={<LandingContent />} />
          <Route path="/login" element={<div className="p-8 text-center text-2xl">Login</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<UserEdit />} />
          {/* <Route path="/add-items/:componentId" element={<MenuItemForm />} /> */}
          {/* <Route path="/edit-item/:itemId" element={<EditMenuItemForm />} /> */}

          <Route path="/createcomponent" element={<MenuComponentForm />} />
          <Route path="/component-list" element={<MenuComponentList />} />
          <Route path="/create-products/:componentId" element={<ProductCreateForm />} />
          <Route path="/list-products/:componentId" element={<ProductsList />} />
          <Route path="/edit-product/:itemId" element={<ProductEdit />} />
          <Route path="/component-with-products" element={<MenuWithProducts />} />
          

        </Routes>
      </Layout>
    </BrowserRouter >
  )

}



